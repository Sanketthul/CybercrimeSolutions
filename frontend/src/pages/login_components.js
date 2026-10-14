import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./CSS/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await api.post("/login-user", { email, password });
      window.localStorage.setItem("token", response.data.data);
      window.localStorage.setItem("loggedIn", "true");
      navigate("/userDetails", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Unable to sign in. Check your connection and try again.");
    } finally { setBusy(false); }
  };
  return <main className="auth-page"><section className="auth-intro"><span className="auth-logo">CS</span><span className="auth-overline">CYBERCRIME SOLUTIONS</span><h1>Your safety.<br/><span>Our priority.</span></h1><p>Sign in to access your secure account and manage your cybercrime reports.</p><div className="auth-assurance">⌁ &nbsp; Secure access · Private case information</div></section><section className="auth-form-wrap"><form className="auth-form" onSubmit={handleSubmit}><div className="section-kicker">WELCOME BACK</div><h2>Sign in to your account</h2><p className="auth-muted">Enter your credentials to continue.</p>{error && <div className="auth-error" role="alert">{error}</div>}<label>Email address<input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" /></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" /></label><button className="auth-submit" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in securely →"}</button><p className="auth-switch">New to Cybercrime Solutions? <Link to="/sign-up">Create an account</Link></p><p className="auth-legal">By continuing, you agree to use this service responsibly.</p></form></section></main>;
}
