import React, { useEffect, useState } from "react";
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
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadUserProfile = async () => {
      const token = sessionStorage.getItem("token");
      const loggedIn = sessionStorage.getItem("loggedIn");

      if (!token || loggedIn !== "true") {
        if (active) {
          setProfileLoading(false);
        }
        return;
      }

      try {
        // Use the same profile source as Navbar.jsx.
        let userData = null;
        const savedUser = sessionStorage.getItem("userData");

        if (savedUser) {
          try {
            userData = JSON.parse(savedUser);
          } catch {
            userData = null;
          }
        }

        // Refresh the profile so we use the latest name and email.
        const response = await api.get("/userData");
        const result = response.data?.data;

        if (result) {
          userData = result;
          sessionStorage.setItem("userData", JSON.stringify(result));
        }

        if (!active) return;

        if (userData) {
          const fullName = [userData.fname, userData.lname]
            .filter((part) => typeof part === "string" && part.trim())
            .join(" ")
            .trim();

          const userName =
            fullName ||
            userData.name?.trim() ||
            userData.username?.trim() ||
            "";

          setForm((previous) => ({
            ...previous,
            name: userName,
            email: userData.email || "",
          }));
        }
      } catch (requestError) {
        console.error(
          "Could not load report form profile:",
          requestError.response?.status || requestError.message,
        );

        // Use cached profile data if the request fails.
        if (active) {
          const savedUser = sessionStorage.getItem("userData");

          if (savedUser) {
            try {
              const userData = JSON.parse(savedUser);
              const fullName = [userData.fname, userData.lname]
                .filter((part) => typeof part === "string" && part.trim())
                .join(" ")
                .trim();

              setForm((previous) => ({
                ...previous,
                name:
                  fullName ||
                  userData.name?.trim() ||
                  userData.username?.trim() ||
                  "",
                email: userData.email || "",
              }));
            } catch {
              // Leave the profile fields empty if cached data is invalid.
            }
          }
        }
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    };

    loadUserProfile();

    return () => {
      active = false;
    };
  }, []);

  const update = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
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

      // Keep the logged-in user's name and email after submission.
      setForm((previous) => ({
        ...previous,
        category: "Online fraud / UPI scam",
        message: "",
      }));

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
            Save this tracking ID and use the same email address to check status
            updates and administrative responses in the tracking section.
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
            value={
              profileLoading && !form.name ? "Loading profile..." : form.name
            }
            readOnly
            autoComplete="name"
            required
            placeholder="Name unavailable"
            aria-busy={profileLoading}
          />
        </label>

        <label>
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            readOnly
            autoComplete="email"
            required
            placeholder="Email unavailable"
            aria-busy={profileLoading}
          />
        </label>

        {!profileLoading && (!form.name || !form.email) && (
          <div className="notice notice-error" role="alert">
            Your profile details could not be fully loaded. Please sign in again
            or refresh the page before submitting your report.
          </div>
        )}

        <label>
          Incident category
          <select
            name="category"
            value={form.category}
            onChange={update}
            disabled={busy}
          >
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
            disabled={busy}
            placeholder="What happened, when it happened, and any relevant details..."
          />
        </label>

        <button
          className="primary-button"
          type="submit"
          disabled={
            busy || profileLoading || !form.name.trim() || !form.email.trim()
          }
        >
          {busy ? "Submitting securely..." : "Submit report"}
        </button>
      </form>
    </section>
  );
}

export default OthercrimeForm;
