import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./CSS/myReports.css";

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusClass(status) {
  return (status || "Submitted")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getReportsFromResponse(responseData) {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.reports)) return responseData.reports;
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.data?.reports)) {
    return responseData.data.reports;
  }
  return [];
}

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedReport, setExpandedReport] = useState(null);
  const [copiedId, setCopiedId] = useState("");

  const loadReports = useCallback(async () => {
    // Use the same storage as Login and api.js.
    if (!window.sessionStorage.getItem("token")) {
      setError("Please sign in to view reports linked to your account.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.get("/api/my-reports");
      setReports(getReportsFromResponse(response.data));
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        setError("Your session has expired. Please sign in again.");
      } else if (requestError.response?.status === 404) {
        setError(
          "The My Reports API was not found. Please check that the backend route /api/my-reports has been added.",
        );
      } else {
        setError(
          requestError.response?.data?.error ||
            "Unable to load your reports. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const copyTrackingId = async (trackingId) => {
    try {
      await navigator.clipboard.writeText(trackingId);
      setCopiedId(trackingId);
      window.setTimeout(() => setCopiedId(""), 1800);
    } catch {
      setError(
        "Unable to copy automatically. Please select the tracking ID and copy it.",
      );
    }
  };

  const filteredReports = reports.filter((report) => {
    if (filter === "All") return true;

    return (
      (report.status || "Submitted").toLowerCase() === filter.toLowerCase()
    );
  });

  const activeCount = reports.filter((report) =>
    ["submitted", "under review", "verified"].includes(
      (report.status || "Submitted").toLowerCase(),
    ),
  ).length;

  const closedCount = reports.filter((report) =>
    ["closed", "guidance provided", "rejected"].includes(
      (report.status || "").toLowerCase(),
    ),
  ).length;

  // Use sessionStorage here too, so page rendering matches the login session.
  if (!window.sessionStorage.getItem("token")) {
    return (
      <main className="my-reports-page">
        <section className="my-reports-hero">
          <span className="my-reports-eyebrow">YOUR PRIVATE CASE SPACE</span>
          <h1>My Reports</h1>
          <p>
            Keep track of the reports you've submitted to Cybercrime Solutions.
          </p>
        </section>

        <section className="my-reports-message">
          <div className="my-reports-message-icon">↗</div>
          <h2>Sign in to view your reports</h2>
          <p>
            Sign in to see reports associated with your account, their tracking
            IDs and status updates.
          </p>
          <Link className="my-reports-primary-button" to="/sign-in">
            Sign in securely
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="my-reports-page">
      <section className="my-reports-hero">
        <div>
          <span className="my-reports-eyebrow">YOUR PRIVATE CASE SPACE</span>
          <h1>My Reports</h1>
          <p>
            View your submitted reports, find tracking IDs, and follow status
            updates without having to remember your tracking ID.
          </p>
        </div>

        <button
          type="button"
          className="my-reports-refresh-button"
          onClick={loadReports}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "↻ Refresh reports"}
        </button>
      </section>

      <section className="my-reports-stats" aria-label="Report summary">
        <article className="my-reports-stat">
          <span className="my-reports-stat-icon">▤</span>
          <div>
            <span>Total reports</span>
            <strong>{reports.length}</strong>
          </div>
        </article>

        <article className="my-reports-stat">
          <span className="my-reports-stat-icon">◷</span>
          <div>
            <span>Active reports</span>
            <strong>{activeCount}</strong>
          </div>
        </article>

        <article className="my-reports-stat">
          <span className="my-reports-stat-icon">✓</span>
          <div>
            <span>Completed / closed</span>
            <strong>{closedCount}</strong>
          </div>
        </article>
      </section>

      {error && (
        <div className="my-reports-error" role="alert">
          <span>{error}</span>

          {error.toLowerCase().includes("sign in") ||
          error.toLowerCase().includes("session has expired") ? (
            <Link to="/sign-in">Sign in</Link>
          ) : (
            <button type="button" onClick={loadReports}>
              Try again
            </button>
          )}
        </div>
      )}

      <section className="my-reports-content">
        <div className="my-reports-content-heading">
          <div>
            <h2>Your submitted reports</h2>
            <p>
              Tracking IDs and updates for reports associated with your account.
            </p>
          </div>

          <Link to="/Othercrime" className="my-reports-new-button">
            + Submit a report
          </Link>
        </div>

        <div className="my-reports-filters" aria-label="Filter reports">
          {[
            "All",
            "Submitted",
            "Under review",
            "Verified",
            "Guidance provided",
            "Rejected",
            "Closed",
          ].map((status) => (
            <button
              type="button"
              key={status}
              className={filter === status ? "active" : ""}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="my-reports-message my-reports-loading">
            <div className="my-reports-spinner" />
            <h2>Loading your reports</h2>
            <p>Please wait while we retrieve your report history.</p>
          </div>
        ) : !error && filteredReports.length === 0 ? (
          <div className="my-reports-message">
            <div className="my-reports-message-icon">▤</div>
            <h2>
              {reports.length
                ? "No reports match this filter"
                : "No reports found yet"}
            </h2>
            <p>
              {reports.length
                ? "Try choosing another status to see your reports."
                : "When you submit a report while signed in, it will appear here so you can find its tracking ID later."}
            </p>

            {reports.length === 0 && (
              <Link className="my-reports-primary-button" to="/Othercrime">
                Submit your first report
              </Link>
            )}
          </div>
        ) : (
          <div className="my-reports-list">
            {filteredReports.map((report) => {
              const trackingId = report.trackingId || "ID unavailable";
              const status = report.status || "Submitted";
              const reportKey = report._id || trackingId;
              const history = Array.isArray(report.statusHistory)
                ? report.statusHistory
                : [];

              return (
                <article className="my-report-card" key={reportKey}>
                  <div className="my-report-card-top">
                    <div className="my-report-category">
                      <span className="my-report-category-icon">▤</span>
                      <div>
                        <h3>{report.category || "Cybercrime report"}</h3>
                        <p>Submitted {formatDate(report.createdAt)}</p>
                      </div>
                    </div>

                    <span
                      className={`my-report-status status-${getStatusClass(status)}`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="my-report-tracking">
                    <div>
                      <span className="my-report-field-label">TRACKING ID</span>
                      <strong>{trackingId}</strong>
                    </div>

                    {report.trackingId && (
                      <button
                        type="button"
                        className="my-report-copy-button"
                        onClick={() => copyTrackingId(report.trackingId)}
                      >
                        {copiedId === report.trackingId
                          ? "Copied ✓"
                          : "Copy ID"}
                      </button>
                    )}
                  </div>

                  {report.message && (
                    <div className="my-report-description">
                      <span className="my-report-field-label">YOUR REPORT</span>
                      <p>{report.message}</p>
                    </div>
                  )}

                  {report.adminResponse && (
                    <div className="my-report-admin-response">
                      <strong>Response from the team</strong>
                      <p>{report.adminResponse}</p>
                    </div>
                  )}

                  <button
                    type="button"
                    className="my-report-history-toggle"
                    onClick={() =>
                      setExpandedReport(
                        expandedReport === reportKey ? null : reportKey,
                      )
                    }
                    aria-expanded={expandedReport === reportKey}
                  >
                    {expandedReport === reportKey
                      ? "Hide status history"
                      : `View status history${
                          history.length ? ` (${history.length})` : ""
                        }`}
                    <span>{expandedReport === reportKey ? "−" : "+"}</span>
                  </button>

                  {expandedReport === reportKey && (
                    <div className="my-report-history">
                      {history.length > 0 ? (
                        history.map((entry, index) => (
                          <div
                            className="my-report-history-entry"
                            key={entry._id || index}
                          >
                            <span className="my-report-history-dot" />
                            <div>
                              <strong>
                                {entry.status ||
                                  entry.newStatus ||
                                  "Status updated"}
                              </strong>

                              {entry.note && <p>{entry.note}</p>}
                              {entry.message && <p>{entry.message}</p>}

                              <span>
                                {formatDate(
                                  entry.updatedAt ||
                                    entry.createdAt ||
                                    entry.date,
                                )}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="my-report-no-history">
                          No additional status history is available for this
                          report yet.
                        </p>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <p className="my-reports-privacy-note">
        <strong>Privacy reminder:</strong> Your reports are private account
        information. Sign out when using a shared device.
      </p>
    </main>
  );
}
