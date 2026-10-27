import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./CSS/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (busy) return;

    setBusy(true);
    setError("");

    try {
      const response = await api.post("/login-user", {
        email: email.trim(),
        password,
      });

      const token = response.data?.data;

      if (!token || typeof token !== "string") {
        throw new Error("The server did not return a valid login token.");
      }

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.removeItem("userType");

      if (response.data?.user) {
        sessionStorage.setItem("userData", JSON.stringify(response.data.user));
      }

      window.dispatchEvent(new Event("auth-change"));

      navigate("/userDetails", { replace: true });
    } catch (requestError) {
      console.error(
        "Login failed:",
        requestError.response?.data || requestError,
      );

      setError(
        requestError.response?.data?.error ||
          requestError.response?.data?.message ||
          requestError.message ||
          "Unable to sign in. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-intro">
        <Link
          to="/"
          className="auth-brand"
          aria-label="Cybercrime Solutions home"
        >
          <span className="auth-logo">CS</span>
          <span className="auth-brand-name">
            CYBERCRIME
            <strong>SOLUTIONS</strong>
          </span>
        </Link>

        <div className="auth-intro-content">
          <span className="auth-overline">
            <span className="auth-status-dot" />
            YOUR DIGITAL SAFETY MATTERS
          </span>

          <h1>
            Your safety.
            <br />
            <span>Our priority.</span>
          </h1>

          <p className="auth-intro-description">
            Take control of your digital safety. Access your account, track your
            submitted reports, and stay informed about cyber threats.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <span className="auth-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
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
              </span>
              <span>
                <strong>Secure account access</strong>
                <small>Your account information stays protected.</small>
              </span>
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M7 9h10M7 13h7M7 17h4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>
                <strong>Report tracking</strong>
                <small>Keep track of your submitted cybercrime reports.</small>
              </span>
            </div>

            <div className="auth-feature">
              <span className="auth-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </span>
              <span>
                <strong>Cyber safety awareness</strong>
                <small>Learn to recognise common online scams.</small>
              </span>
            </div>
          </div>
        </div>

        <div className="auth-intro-footer">
          <span className="auth-footer-line" />
          <p>Stay alert. Stay informed. Stay secure.</p>
        </div>
      </section>

      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-heading">
            <span className="section-kicker">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p className="auth-muted">
              Enter your credentials to continue to your dashboard.
            </p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              <span className="auth-error-icon" aria-hidden="true">
                !
              </span>
              <span>{error}</span>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="login-email">Email address</label>
            <div className="auth-input-wrap">
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
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="you@example.com"
                disabled={busy}
              />
            </div>
          </div>

          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="login-password">Password</label>
            </div>

            <div className="auth-input-wrap">
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
                <circle cx="12" cy="15" r="1.2" fill="currentColor" />
              </svg>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Enter your password"
                disabled={busy}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                disabled={busy}
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
          </div>

          <button className="auth-submit" type="submit" disabled={busy}>
            {busy ? (
              <>
                <span className="auth-spinner" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              <>
                Sign in securely
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>

          <div className="auth-secure-note">
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
              Your credentials are submitted over your configured API
              connection.
            </span>
          </div>

          <div className="auth-divider">
            <span />
            <span>YOUR DIGITAL SAFETY</span>
            <span />
          </div>

          <p className="auth-switch">
            New to Cybercrime Solutions?{" "}
            <Link to="/sign-up">Create an account</Link>
          </p>

          <p className="auth-legal">
            By continuing, you agree to use this service responsibly. Never
            share your password or OTP with anyone.
          </p>
        </form>

        <footer className="auth-page-footer">
          <Link to="/">← Back to homepage</Link>
          <span>Cybercrime Solutions</span>
        </footer>
      </section>
    </main>
  );
}
