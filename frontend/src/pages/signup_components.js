import React, { useState } from "react";
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
      <form className="signup-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p className="signup-subtitle">Register for Cybercrime Solutions</p>

        {error && (
          <div className="signup-alert signup-error" role="alert">
            {error}
          </div>
        )}

        {message && (
          <div className="signup-alert signup-success" role="status">
            {message}
          </div>
        )}

        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your first and last name"
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          value={form.password}
          onChange={handleChange}
          placeholder="Minimum 8 characters"
          required
        />

        <label htmlFor="userType">Account Type</label>
        <select
          id="userType"
          name="userType"
          value={form.userType}
          onChange={handleChange}
          required
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        {form.userType === "Admin" && (
          <div className="admin-code-field">
            <label htmlFor="adminCode">Admin Secret Code</label>
            <input
              id="adminCode"
              name="adminCode"
              type="password"
              autoComplete="off"
              value={form.adminCode}
              onChange={handleChange}
              placeholder="Enter your admin secret code"
              required
            />
            <small>The code is verified securely by the server.</small>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
