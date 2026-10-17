import React, { useCallback, useEffect, useState } from "react";
import api from "../api";
import "./CSS/intelligence.css";

const number = (value) => Number(value || 0).toLocaleString("en-IN");

export default function IntelligenceDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadIntelligence = useCallback(async () => {
    setError("");

    try {
      const response = await api.get("/api/intelligence");
      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Could not load intelligence. Check your connection and admin session.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIntelligence();

    // Refresh the dashboard every 5 minutes.
    const timer = window.setInterval(loadIntelligence, 5 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [loadIntelligence]);

  const reports = data?.reports;
  const maxMonthly = Math.max(
    1,
    ...(data?.monthlyTrend || []).map((item) => item.count),
  );
  const maxCategory = Math.max(
    1,
    ...(data?.categories || []).map((item) => item.count),
  );

  if (loading && !data) {
    return (
      <div className="intel-loading">
        <span className="intel-spinner" />
        Loading cyber intelligence...
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="intel-error">
        <strong>Intelligence unavailable</strong>
        <p>{error}</p>
        <button onClick={loadIntelligence}>Try again</button>
      </div>
    );
  }

  return (
    <div className="intel-dashboard">
      <section className="intel-hero">
        <div>
          <span className="intel-eyebrow">
            <span className="intel-live-dot" />
            SECURITY INTELLIGENCE
          </span>
          <h2>Threat intelligence center</h2>
          <p>
            Monitor community-reported malicious URLs and the incidents reported
            through your platform.
          </p>
        </div>

        <button
          className="intel-refresh"
          onClick={loadIntelligence}
          disabled={loading}
        >
          ↻ {loading ? "Refreshing..." : "Refresh data"}
        </button>
      </section>

      {error && <div className="intel-notice">{error}</div>}

      <div className="intel-updated">
        <span>
          Last dashboard response:{" "}
          {data?.generatedAt
            ? new Date(data.generatedAt).toLocaleString("en-IN")
            : "Unavailable"}
        </span>
        <span>Source: your MongoDB + URLhaus</span>
      </div>

      <section className="intel-metrics">
        <article className="intel-metric">
          <div className="intel-metric-top">
            <span>Total reports</span>
            <span className="intel-icon">▤</span>
          </div>
          <strong>{number(reports?.total)}</strong>
          <small>Reports in your database</small>
        </article>

        <article className="intel-metric">
          <div className="intel-metric-top">
            <span>Awaiting review</span>
            <span className="intel-icon amber">◷</span>
          </div>
          <strong>
            {number((reports?.submitted || 0) + (reports?.underReview || 0))}
          </strong>
          <small>Submitted + under review</small>
        </article>

        <article className="intel-metric">
          <div className="intel-metric-top">
            <span>Resolved</span>
            <span className="intel-icon green">✓</span>
          </div>
          <strong>
            {number((reports?.resolved || 0) + (reports?.closed || 0))}
          </strong>
          <small>Resolved or closed reports</small>
        </article>

        <article className="intel-metric">
          <div className="intel-metric-top">
            <span>Threat indicators</span>
            <span className="intel-icon red">⌁</span>
          </div>
          <strong>{number(data?.threats?.total)}</strong>
          <small>URLhaus entries in the current snapshot</small>
        </article>
      </section>

      <section className="intel-grid">
        <article className="intel-panel">
          <div className="intel-panel-heading">
            <div>
              <h3>Report activity</h3>
              <p>Reports created per month</p>
            </div>
            <span className="intel-tag">6 months</span>
          </div>

          <div className="intel-chart">
            {(data?.monthlyTrend || []).map((item) => (
              <div className="intel-bar-column" key={item.month}>
                <span className="intel-bar-value">{item.count}</span>
                <div className="intel-bar-track">
                  <div
                    className="intel-bar"
                    style={{
                      height: `${Math.max(
                        item.count > 0 ? 5 : 0,
                        (item.count / maxMonthly) * 100,
                      )}%`,
                    }}
                  />
                </div>
                <span className="intel-bar-label">{item.month}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="intel-panel">
          <div className="intel-panel-heading">
            <div>
              <h3>Incident categories</h3>
              <p>Most frequently reported categories</p>
            </div>
          </div>

          <div className="intel-categories">
            {(data?.categories || []).map((item) => (
              <div className="intel-category" key={item.name}>
                <div className="intel-category-label">
                  <span title={item.name}>{item.name}</span>
                  <strong>{number(item.count)}</strong>
                </div>
                <div className="intel-category-track">
                  <div
                    className="intel-category-fill"
                    style={{
                      width: `${(item.count / maxCategory) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}

            {!data?.categories?.length && (
              <div className="intel-empty">
                No reports available yet. New reports will appear here.
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="intel-panel intel-threat-panel">
        <div className="intel-panel-heading">
          <div>
            <span className="intel-eyebrow">EXTERNAL THREAT FEED</span>
            <h3>Recently reported malicious URLs</h3>
            <p>
              Community-reported malware distribution indicators from URLhaus.
            </p>
          </div>

          <span
            className={`intel-feed-status ${
              data?.threats?.status === "live"
                ? "is-live"
                : data?.threats?.status === "cached"
                  ? "is-cached"
                  : "is-offline"
            }`}
          >
            {data?.threats?.status === "live"
              ? "Feed refreshed"
              : data?.threats?.status === "cached"
                ? "Cached snapshot"
                : "Feed unavailable"}
          </span>
        </div>

        {data?.threats?.fetchedAt && (
          <p className="intel-feed-time">
            Last successful fetch:{" "}
            {new Date(data.threats.fetchedAt).toLocaleString("en-IN")}
          </p>
        )}

        <div className="intel-table-wrap">
          <table className="intel-table">
            <thead>
              <tr>
                <th>Host</th>
                <th>Threat type</th>
                <th>Reported</th>
                <th>Feed status</th>
              </tr>
            </thead>
            <tbody>
              {(data?.threats?.items || []).map((item) => (
                <tr key={item.id || item.url}>
                  <td>
                    <strong>{item.host || "Unknown host"}</strong>
                    <small className="intel-url">{item.url}</small>
                  </td>
                  <td>{item.threat || "Not specified"}</td>
                  <td>
                    {item.dateAdded
                      ? new Date(item.dateAdded).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                  <td>
                    <span className="intel-status-pill">
                      {item.status || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!data?.threats?.items?.length && (
            <div className="intel-empty">
              No threat entries are available. Check the backend feed
              configuration and try refreshing.
            </div>
          )}
        </div>

        <p className="intel-disclaimer">
          These are third-party threat indicators, not proof that a listed URL
          affected a user of this platform. Do not open suspicious URLs. URLhaus
          data may change after publication.
        </p>
      </section>

      <section className="intel-panel">
        <div className="intel-panel-heading">
          <div>
            <h3>Latest platform reports</h3>
            <p>Recent records submitted to Cybercrime Solutions</p>
          </div>
        </div>

        <div className="intel-recent-list">
          {(data?.recentReports || []).map((item) => (
            <div className="intel-recent-item" key={item._id}>
              <div className="intel-recent-icon">↗</div>
              <div className="intel-recent-copy">
                <strong>{item.category || "Other cybercrime"}</strong>
                <span>{item.trackingId || "Legacy report"}</span>
              </div>
              <span
                className={`intel-status-pill status-${String(
                  item.status || "Submitted",
                )
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                {item.status || "Submitted"}
              </span>
              <time>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-IN")
                  : "—"}
              </time>
            </div>
          ))}

          {!data?.recentReports?.length && (
            <div className="intel-empty">
              No reports have been submitted yet.
            </div>
          )}
        </div>
      </section>

      <footer className="intel-footer">
        <span>Cybercrime Solutions · Intelligence workspace</span>
        <span>
          {data?.threats?.provider || "External feed"} · Data is refreshed
          periodically
        </span>
      </footer>
    </div>
  );
}
