const fs = require("fs");
const path = require("path");

// Load environment variables from the local .env file.
const envPath = path.join(__dirname, ".env");

if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);

      if (match && process.env[match[1]] === undefined) {
        process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
      }
    });
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Feedback = require("./models/Feedback");
const OtherCrime = require("./models/othercrime");

require("./userDetails");

const User = mongoose.model("UserInfo");

const app = express();
const PORT = process.env.PORT || 4000;

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_SIGNUP_CODE = process.env.ADMIN_SIGNUP_CODE;

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Validate required environment variables.
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error("Startup blocked: JWT_SECRET must be at least 32 characters.");
  process.exit(1);
}

if (!MONGODB_URI) {
  console.error(
    "Startup blocked: MONGODB_URI is missing. Configure it in .env.",
  );
  process.exit(1);
}

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  next();
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "100kb" }));

// Simple in-memory rate limiter.
// A shared store is recommended for multi-instance deployments.
const attempts = new Map();

function rateLimit({ windowMs = 15 * 60 * 1000, max = 100 } = {}) {
  return (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const entry = attempts.get(key);

    if (!entry || now - entry.start > windowMs) {
      attempts.set(key, { start: now, count: 1 });
    } else {
      entry.count += 1;
    }

    const current = attempts.get(key);

    if (current.count > max) {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    next();
  };
}

app.use(rateLimit());

const clean = (value, max = 5000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const publicUser = (user) => ({
  _id: user._id,
  fname: user.fname,
  lname: user.lname,
  email: user.email,
  userType: user.userType,
  createdAt: user.createdAt,
});

// Compare the submitted Admin secret without a direct
// variable-time string comparison.
function matchesAdminSecret(submittedCode, configuredCode) {
  if (
    typeof submittedCode !== "string" ||
    typeof configuredCode !== "string" ||
    configuredCode.length === 0
  ) {
    return false;
  }

  const submittedHash = crypto
    .createHash("sha256")
    .update(submittedCode, "utf8")
    .digest();

  const configuredHash = crypto
    .createHash("sha256")
    .update(configuredCode, "utf8")
    .digest();

  return crypto.timingSafeEqual(submittedHash, configuredHash);
}

// Authentication middleware.
async function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return res.status(401).json({
      error: "Authentication required.",
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    // Retrieve the role from MongoDB instead of trusting client data.
    const user = await User.findById(payload.sub).select(
      "fname lname email userType",
    );

    if (!user) {
      return res.status(401).json({
        error: "Account no longer exists.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Session expired or invalid. Please sign in again.",
    });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.userType !== "Admin") {
    return res.status(403).json({
      error: "Administrator access required.",
    });
  }

  next();
}

// Health check.
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "connecting",
  });
});

// Submit feedback.
app.post("/api/feedbacks", async (req, res) => {
  try {
    const name = clean(req.body.name, 100);
    const email = clean(req.body.email, 254).toLowerCase();
    const subject = clean(req.body.subject, 160);
    const message = clean(req.body.message, 5000);

    if (!name || !emailIsValid(email) || !subject || !message) {
      return res.status(400).json({
        error: "Please provide a valid name, email, subject and message.",
      });
    }

    const feedback = await Feedback.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Feedback submitted successfully.",
      id: feedback._id,
    });
  } catch (error) {
    console.error("Feedback submission failed:", error.message);

    res.status(500).json({
      error: "Unable to submit feedback right now.",
    });
  }
});

// Retrieve feedback (Admin only).
app.get("/api/feedbacks", authenticate, requireAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();

    res.json(feedbacks);
  } catch (error) {
    console.error("Feedback retrieval failed:", error.message);

    res.status(500).json({
      error: "Unable to load feedback.",
    });
  }
});

// Submit a cybercrime report.
app.post(
  "/api/othercrime",
  rateLimit({ windowMs: 60 * 60 * 1000, max: 10 }),
  async (req, res) => {
    try {
      const name = clean(req.body.name, 100);
      const email = clean(req.body.email, 254).toLowerCase();
      const message = clean(req.body.message, 5000);
      const category = clean(req.body.category || "Other cybercrime", 100);

      if (!name || !emailIsValid(email) || message.length < 10) {
        return res.status(400).json({
          error:
            "Enter your name, a valid email and a description of at least 10 characters.",
        });
      }

      const trackingId = `CCS-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;

      const report = await OtherCrime.create({
        name,
        email,
        message,
        category,
        trackingId,
      });

      res.status(201).json({
        message: "Report submitted successfully.",
        trackingId: report.trackingId,
        status: report.status,
      });
    } catch (error) {
      console.error("Complaint submission failed:", error.message);

      res.status(500).json({
        error: "Unable to submit your report right now.",
      });
    }
  },
);

// Track a complaint using its tracking ID and submitter email.
app.post(
  "/api/othercrime/track",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }),
  async (req, res) => {
    try {
      const trackingId = clean(req.body.trackingId, 30).toUpperCase();

      const email = clean(req.body.email, 254).toLowerCase();

      if (!trackingId || !emailIsValid(email)) {
        return res.status(400).json({
          error: "Tracking ID and valid email are required.",
        });
      }

      const report = await OtherCrime.findOne({
        trackingId,
        email,
      })
        .select("trackingId category status createdAt updatedAt statusHistory")
        .lean();

      if (!report) {
        return res.status(404).json({
          error: "No report matched those details.",
        });
      }

      res.json({
        trackingId: report.trackingId,
        category: report.category,
        status: report.status,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
        statusHistory: (report.statusHistory || []).map(
          ({ status, note, createdAt }) => ({
            status,
            note,
            createdAt,
          }),
        ),
      });
    } catch (error) {
      console.error("Complaint tracking failed:", error.message);

      res.status(500).json({
        error: "Unable to track this report right now.",
      });
    }
  },
);

// Retrieve complaints (Admin only).
app.get("/api/othercrime", authenticate, requireAdmin, async (req, res) => {
  try {
    const reports = await OtherCrime.find()
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();

    res.json(reports);
  } catch (error) {
    console.error("Complaint retrieval failed:", error.message);

    res.status(500).json({
      error: "Unable to load complaints.",
    });
  }
});

// Update complaint status (Admin only).
app.patch(
  "/api/othercrime/:id/status",
  authenticate,
  requireAdmin,
  async (req, res) => {
    const allowedStatuses = [
      "Submitted",
      "Under Review",
      "In Progress",
      "Resolved",
      "Closed",
    ];

    const status = clean(req.body.status, 40);

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "Invalid complaint ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid status value.",
      });
    }

    try {
      const report = await OtherCrime.findById(req.params.id);

      if (!report) {
        return res.status(404).json({
          error: "Complaint not found.",
        });
      }

      report.status = status;

      report.statusHistory.push({
        status,
        changedBy: req.user.email,
        note: clean(req.body.note, 500),
      });

      await report.save();

      res.json({
        message: "Complaint status updated.",
        report,
      });
    } catch (error) {
      console.error("Complaint status update failed:", error.message);

      res.status(500).json({
        error: "Unable to update complaint status.",
      });
    }
  },
);

// Register a new User or Admin.
// The UserInfo schema requires fname and lname.
app.post(
  "/register",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }),
  async (req, res) => {
    try {
      const {
        fname,
        lname,
        email,
        password,
        userType = "User",
        adminCode,
      } = req.body;

      const firstName = clean(fname, 100);
      const lastName = clean(lname, 100);
      const normalizedEmail = clean(email, 254).toLowerCase();

      if (
        !firstName ||
        !lastName ||
        !emailIsValid(normalizedEmail) ||
        typeof password !== "string" ||
        password.length < 8 ||
        password.length > 128
      ) {
        return res.status(400).json({
          message:
            "Enter your first name, last name, valid email and a password between 8 and 128 characters.",
        });
      }

      if (!["User", "Admin"].includes(userType)) {
        return res.status(400).json({
          message: "Invalid account type.",
        });
      }

      // Only allow Admin registration when the secret is configured
      // and the submitted code matches it.
      if (userType === "Admin") {
        if (!ADMIN_SIGNUP_CODE) {
          console.error(
            "Admin registration blocked: ADMIN_SIGNUP_CODE is not configured.",
          );

          return res.status(503).json({
            message: "Admin registration is not configured.",
          });
        }

        if (!matchesAdminSecret(adminCode, ADMIN_SIGNUP_CODE)) {
          return res.status(403).json({
            message: "Invalid admin secret code.",
          });
        }
      }

      const existingUser = await User.findOne({
        email: normalizedEmail,
      });

      if (existingUser) {
        return res.status(409).json({
          message: "An account with this email already exists.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        fname: firstName,
        lname: lastName,
        email: normalizedEmail,
        password: hashedPassword,
        userType,
      });

      return res.status(201).json({
        message: "Registration successful.",
        user: publicUser(newUser),
      });
    } catch (error) {
      console.error("Registration error:", error.message);

      if (error.code === 11000) {
        return res.status(409).json({
          message: "An account with this email already exists.",
        });
      }

      if (error.name === "ValidationError") {
        return res.status(400).json({
          message:
            "Registration details do not match the user model. Check the required fields.",
        });
      }

      return res.status(500).json({
        message: "Registration failed. Please try again.",
      });
    }
  },
);

// Login.
app.post(
  "/login-user",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 15 }),
  async (req, res) => {
    try {
      const email = clean(req.body.email, 254).toLowerCase();

      const password =
        typeof req.body.password === "string" ? req.body.password : "";

      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          status: "error",
          error: "Invalid email or password.",
        });
      }

      const token = jwt.sign({ sub: user._id.toString() }, JWT_SECRET, {
        expiresIn: "8h",
        algorithm: "HS256",
      });

      res.json({
        status: "ok",
        data: token,
        user: publicUser(user),
      });
    } catch (error) {
      console.error("Login failed:", error.message);

      res.status(500).json({
        error: "Unable to sign in right now.",
      });
    }
  },
);

// Get current authenticated user's information.
app.get("/userData", authenticate, (req, res) => {
  res.json({
    status: "ok",
    data: publicUser(req.user),
  });
});

// Retrieve all users (Admin only).
app.get("/getAllUser", authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .select("fname lname email userType createdAt")
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();

    res.json({
      status: "ok",
      data: users,
    });
  } catch (error) {
    console.error("User list failed:", error.message);

    res.status(500).json({
      error: "Unable to load users.",
    });
  }
});

// Delete a user (Admin only).
app.delete("/users/:id", authenticate, requireAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      error: "Invalid user ID.",
    });
  }

  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({
      error: "You cannot delete your own administrator account.",
    });
  }

  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    res.json({
      status: "ok",
      message: "User deleted.",
    });
  } catch (error) {
    console.error("User deletion failed:", error.message);

    res.status(500).json({
      error: "Unable to delete user.",
    });
  }
});

// Handle CORS and other unexpected errors.
app.use((err, req, res, next) => {
  if (err.message === "Origin is not allowed by CORS") {
    return res.status(403).json({
      error: "This origin is not allowed.",
    });
  }

  console.error("Unhandled API error:", err.message);

  res.status(500).json({
    error: "Unexpected server error.",
  });
});

// Connect to MongoDB and start the API.
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Cybercrime Solutions API listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
