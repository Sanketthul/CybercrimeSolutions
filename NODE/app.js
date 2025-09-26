const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const Feedback = require("./models/Feedback");
const OtherCrime = require("./models/othercrime");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "ieybuyewrcvuyewrvwbuycbi89nubewubfuyebiub2[]nuew";

const mongoUrl =
  "mongodb+srv://sanket9498thul:Sanket18@cluster0.mjeqyik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl, {
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // timeout after 10s instead of hanging forever
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

require("./userDetails");

const User = mongoose.model("UserInfo");

// Feedback submission route
app.post("/api/feedbacks", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newFeedback = new Feedback({ name, email, subject, message });
    await newFeedback.save();
    res.status(201).send("Feedback submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Feedback retrieval route
app.get("/api/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Other Crime submission route
app.post("/api/othercrime", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newOtherCrime = new OtherCrime({ name, email, message });
    await newOtherCrime.save();
    res.status(201).send("Other Crime submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Other Crime retrieval route (to view submitted cases)
app.get("/api/othercrime", async (req, res) => {
  try {
    const otherCrimes = await OtherCrime.find();
    res.json(otherCrimes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists " });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: "User Not Found " });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 120,
    });
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(4000, () => {
  console.log("server started");
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    User.deleteOne({ _id: userid }).then(function (err, res) {
      console.log(err);
    });
    res.send({ status: "ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
