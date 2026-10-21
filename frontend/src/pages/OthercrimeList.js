import React, { useState } from "react";
import api from "../api";
import "./CSS/Othercrime.css";

const STATUS_STEPS = [
  "Submitted",
  "Under review",
  "Verified",
  "Guidance provided",
  "Closed",
];

const formatDate = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleString();
};

export default function OthercrimeList() {
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const track = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setReport(null);

    try {
      const result = await api.post("/api/othercrime/track", {
        trackingId: trackingId.trim().toUpperCase(),
        email: email.trim(),
      });

      setReport(result.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.error || "Unable to look up this report.",
      );
    } finally {
      setBusy(false);
    }
  };

  const currentStatus = report?.status || "Submitted";
  const isRejected = currentStatus === "Rejected";

  const currentStep = STATUS_STEPS.indexOf(currentStatus);

  return (
    <section className="track-card">
      <div className="section-kicker">CASE UPDATES</div>

      <h2>Track your report</h2>

      <p className="muted">
        Enter your tracking ID and the email address used during submission.
        Only matching details can access this status page.
      </p>

      <form className="track-form" onSubmit={track}>
        <label>
          Tracking ID
          <input
            value={trackingId}
            onChange={(event) =>
              setTrackingId(event.target.value.toUpperCase())
            }
            required
            maxLength="30"
            placeholder="CCS-A1B2C3D4"
          />
        </label>

        <label>
          Report email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            maxLength="254"
            placeholder="Email used in your report"
          />
        </label>

        <button className="secondary-button" type="submit" disabled={busy}>
          {busy ? "Checking…" : "Check status"}
        </button>
      </form>

      {error && (
        <div className="notice notice-error" role="alert">
          {error}
        </div>
      )}

      {report && (
        <div className="tracking-result" aria-live="polite">
          <div>
            <span className="muted">Tracking ID</span>
            <strong>{report.trackingId}</strong>
          </div>

          <div>
            <span className="muted">Incident category</span>
            <strong>{report.category}</strong>
          </div>

          <div>
            <span className="muted">Current status</span>
            <strong className="status-pill">{currentStatus}</strong>
          </div>

          <div>
            <span className="muted">Submitted</span>
            <strong>{formatDate(report.createdAt)}</strong>
          </div>

          <div>
            <span className="muted">Last updated</span>
            <strong>{formatDate(report.updatedAt)}</strong>
          </div>

          {!isRejected && (
            <div className="report-progress">
              <strong>Review progress</strong>

              <div className="report-progress-track">
                {STATUS_STEPS.map((step, index) => {
                  const completed =
                    currentStatus === "Closed" ||
                    (currentStep >= 0 && index <= currentStep);

                  return (
                    <div
                      className={`report-progress-step ${
                        completed ? "completed" : ""
                      }`}
                      key={step}
                    >
                      <span className="progress-dot" />
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {isRejected && (
            <div className="report-response rejected-response">
              <strong>Review decision</strong>
              <p>
                This report was rejected by the platform review team. See the
                explanation below, if provided.
              </p>
            </div>
          )}

          <div className="report-response">
            <strong>Latest response from the admin</strong>
            <p>
              {report.adminResponse ||
                "No additional administrative response has been provided yet."}
            </p>
          </div>

          <div className="timeline">
            <strong>Status history</strong>

            {(report.statusHistory || []).map((item, index) => (
              <div
                className="timeline-item"
                key={`${item.status}-${item.createdAt || index}`}
              >
                <span className="timeline-dot" />

                <div>
                  <strong>{item.status}</strong>

                  <p>{item.note || "Status updated."}</p>

                  <small>{formatDate(item.createdAt)}</small>
                </div>
              </div>
            ))}
          </div>

          <p className="tracking-disclaimer">
            Statuses describe the review conducted by Cybercrime Solutions only.
            A closed platform review does not mean that a police investigation,
            legal proceeding or financial recovery has been completed.
          </p>
        </div>
      )}
    </section>
  );
}
