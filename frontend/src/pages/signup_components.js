import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./CSS/signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "User",
    adminCode: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "userType" && value !== "Admin" ? { adminCode: "" } : {}),
    }));

    setError("");
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setMessage("");

    const nameParts = form.name.trim().split(/\s+/);
    const fname = nameParts[0] || "";
    const lname = nameParts.slice(1).join(" ");

    if (!fname || !lname) {
      setError("Please enter your first and last name.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.userType === "Admin" && !form.adminCode.trim()) {
      setError("Enter the admin secret code.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fname,
        lname,
        email: form.email.trim(),
        password: form.password,
        userType: form.userType,
      };

      if (form.userType === "Admin") {
        payload.adminCode = form.adminCode;
      }

      const response = await api.post("/register", payload);

      setMessage(response.data?.message || "Registration successful.");

      setForm({
        name: "",
        email: "",
        password: "",
        userType: "User",
        adminCode: "",
      });

      setShowPassword(false);
      setShowAdminCode(false);
    } catch (err) {
      console.error("Registration failed:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          (err.code === "ERR_NETWORK"
            ? "Cannot connect to the server. Check that your backend is running."
            : err.message) ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="signup-page">
      <section className="signup-intro">
        <Link
          to="/"
          className="signup-brand"
          aria-label="Cybercrime Solutions home"
        >
          <span className="signup-logo">CS</span>
          <span className="signup-brand-name">
            CYBERCRIME
            <strong>SOLUTIONS</strong>
          </span>
        </Link>

        <div className="signup-intro-content">
          <span className="signup-overline">
            <span className="signup-status-dot" />
            BUILD A SAFER DIGITAL WORLD
          </span>

          <h1>
            Your safety.
            <br />
            <span>Our priority.</span>
          </h1>

          <p className="signup-intro-description">
            Sign up to access your secure account and manage your cybercrime
            reports.
          </p>

          <div className="signup-benefits">
            <div className="signup-benefit">
              <span className="signup-benefit-number">01</span>
              <div>
                <strong>Stay informed</strong>
                <p>Understand common scams and online threats.</p>
              </div>
            </div>

            <div className="signup-benefit">
              <span className="signup-benefit-number">02</span>
              <div>
                <strong>Manage your reports</strong>
                <p>Keep your submitted report details accessible.</p>
              </div>
            </div>

            <div className="signup-benefit">
              <span className="signup-benefit-number">03</span>
              <div>
                <strong>Make safer decisions</strong>
                <p>Build better habits for everyday internet use.</p>
              </div>
            </div>
          </div>

          <div className="signup-intro-note">
            <span className="signup-note-mark">✓</span>
            <p>Awareness is your first line of defence.</p>
          </div>
        </div>

        <div className="signup-intro-footer">
          <span className="signup-footer-line" />
          <p>Stay alert. Stay informed. Stay secure.</p>
        </div>
      </section>

      <section className="signup-form-wrap">
        <form className="signup-card" onSubmit={handleSubmit}>
          <div className="signup-heading">
            <span className="signup-kicker">GET STARTED</span>
            <h2>Create your account</h2>
            <p className="signup-subtitle">
              Join Cybercrime Solutions and take charge of your digital safety.
            </p>
          </div>

          {error && (
            <div className="signup-alert signup-error" role="alert">
              <span className="signup-alert-icon">!</span>
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="signup-alert signup-success" role="status">
              <span className="signup-alert-icon">✓</span>
              <span>{message}</span>
            </div>
          )}

          <div className="signup-field">
            <label htmlFor="signup-name">Full name</label>
            <div className="signup-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M4 21v-2a8 8 0 0 1 16 0v2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your first and last name"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="signup-field">
            <label htmlFor="signup-email">Email address</label>
            <div className="signup-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m4 7 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password">Password</label>
            <div className="signup-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="signup-visibility-button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                disabled={loading}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.9M6.2 6.2C3.9 7.8 3 12 3 12s3.5 7 9 7c1 0 2-.2 2.9-.6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                )}
              </button>
            </div>
            <small className="signup-field-hint">
              Use at least 8 characters. Choose a password you don't use
              elsewhere.
            </small>
          </div>

          <div className="signup-field">
            <label htmlFor="signup-userType">Account type</label>
            <div className="signup-input-wrap signup-select-wrap">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3 19 6v5c0 4.7-3 8-7 10-4-2-7-5.3-7-10V6l7-3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
              <select
                id="signup-userType"
                name="userType"
                value={form.userType}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="User">Standard user</option>
                <option value="Admin">Administrator</option>
              </select>
              <span className="signup-select-arrow" aria-hidden="true">
                ▾
              </span>
            </div>
            <small className="signup-field-hint">
              Choose the account type appropriate for your role.
            </small>
          </div>

          {form.userType === "Admin" && (
            <div className="signup-admin-section">
              <div className="signup-admin-heading">
                <span className="signup-admin-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M8 10V7a4 4 0 0 1 8 0v3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span>
                  <strong>Administrator verification</strong>
                  <small>
                    Enter the secret code provided to authorised admins.
                  </small>
                </span>
              </div>

              <label htmlFor="signup-adminCode">Admin secret code</label>
              <div className="signup-input-wrap">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  id="signup-adminCode"
                  name="adminCode"
                  type={showAdminCode ? "text" : "password"}
                  autoComplete="off"
                  value={form.adminCode}
                  onChange={handleChange}
                  placeholder="Enter admin secret code"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="signup-visibility-button"
                  onClick={() => setShowAdminCode((visible) => !visible)}
                  aria-label={
                    showAdminCode ? "Hide admin code" : "Show admin code"
                  }
                  aria-pressed={showAdminCode}
                  disabled={loading}
                >
                  {showAdminCode ? "Hide" : "Show"}
                </button>
              </div>
              <small className="signup-admin-note">
                The server must verify this code before granting admin access.
              </small>
            </div>
          )}

          <button className="signup-submit" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="signup-spinner" aria-hidden="true" />
                Creating account...
              </>
            ) : (
              <>
                Create account
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>

          <div className="signup-secure-note">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3 19 6v5c0 4.7-3 8-7 10-4-2-7-5.3-7-10V6l7-3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="m9 12 2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              Your account details are handled by the registration service.
            </span>
          </div>

          <p className="signup-login-link">
            Already have an account? <Link to="/sign-in">Sign in instead</Link>
          </p>

          <p className="signup-legal">
            By creating an account, you agree to use this service responsibly.
            Never share passwords, OTPs, or banking credentials.
          </p>
        </form>

        <footer className="signup-page-footer">
          <Link to="/">← Back to homepage</Link>
          <span>Cybercrime Solutions</span>
        </footer>
      </section>
    </main>
  );
}
