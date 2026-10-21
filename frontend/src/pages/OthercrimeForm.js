import React, { useState } from "react";
import api from "../api";
import "./CSS/Othercrime.css";

function OthercrimeForm({ onSubmitted }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "Online fraud / UPI scam",
    message: "",
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [copied, setCopied] = useState(false);

  const update = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setReceipt(null);
    setCopied(false);

    try {
      const response = await api.post("/api/othercrime", form);

      setReceipt(response.data);

      setForm({
        name: "",
        email: "",
        category: "Online fraud / UPI scam",
        message: "",
      });

      onSubmitted?.(response.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "We couldn't submit your report. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const copyTrackingId = async () => {
    if (!receipt?.trackingId) return;

    try {
      await navigator.clipboard.writeText(receipt.trackingId);
      setCopied(true);
    } catch {
      setError(
        "Copy was unavailable. Please select and copy the tracking ID manually.",
      );
    }
  };

  return (
    <section className="report-card">
      <div className="section-kicker">SECURE REPORTING</div>
      <h2>Tell us what happened</h2>

      <p className="muted">
        Share the details you can safely provide. Never include passwords, PINs
        or OTPs.
      </p>

      {error && (
        <div className="notice notice-error" role="alert">
          {error}
        </div>
      )}

      {receipt && (
        <div className="notice notice-success" role="status">
          <strong>Report received successfully.</strong>

          <p>Your tracking ID is:</p>

          <div className="receipt-tracking-id">
            <code>{receipt.trackingId}</code>
            <button
              type="button"
              className="secondary-button"
              onClick={copyTrackingId}
            >
              {copied ? "Copied" : "Copy ID"}
            </button>
          </div>

          <p>
            <strong>Current status:</strong> {receipt.status}
          </p>

          <p>
            Save this tracking ID and use the same email address you entered
            above to check status updates and administrative responses in the
            tracking section.
          </p>

          <p>
            <strong>Important:</strong> This receipt confirms submission to
            Cybercrime Solutions. It is not an official police complaint
            acknowledgement.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="report-form">
        <label>
          Full name
          <input
            name="name"
            value={form.name}
            onChange={update}
            autoComplete="name"
            maxLength="100"
            required
            placeholder="Your full name"
          />
        </label>

        <label>
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            autoComplete="email"
            maxLength="254"
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Incident category
          <select name="category" value={form.category} onChange={update}>
            <option>Online fraud / UPI scam</option>
            <option>Social media account compromise</option>
            <option>Identity theft / impersonation</option>
            <option>Cyberbullying / harassment</option>
            <option>Phishing / suspicious link</option>
            <option>Other cybercrime</option>
          </select>
        </label>

        <label className="full-field">
          Describe the incident
          <textarea
            name="message"
            value={form.message}
            onChange={update}
            minLength="10"
            maxLength="5000"
            required
            rows="5"
            placeholder="What happened, when it happened, and any relevant details…"
          />
        </label>

        <button className="primary-button" type="submit" disabled={busy}>
          {busy ? "Submitting securely…" : "Submit report"}
        </button>
      </form>
    </section>
  );
}

export default OthercrimeForm;
