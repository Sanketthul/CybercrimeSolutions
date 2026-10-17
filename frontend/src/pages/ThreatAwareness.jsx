import React, { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api";
import "./CSS/threatAwareness.css";

const SAFETY_TIPS = [
  {
    icon: "🔗",
    title: "Check links before clicking",
    description:
      "Verify the domain carefully. Avoid suspicious links received through SMS, email, or social media.",
  },
  {
    icon: "🔐",
    title: "Protect your accounts",
    description:
      "Use unique passwords and enable two-factor authentication wherever possible.",
  },
  {
    icon: "💳",
    title: "Never share OTPs",
    description:
      "Banks and legitimate support teams will never ask you to reveal your OTP, PIN, or CVV.",
  },
  {
    icon: "🛡️",
    title: "Keep devices updated",
    description:
      "Install security updates and use trusted software to reduce exposure to malicious files and websites.",
  },
];

const formatDate = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getDateKey = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
};

const getThreatLabel = (item) => {
  if (item?.threat) return String(item.threat);

  if (Array.isArray(item?.tags) && item.tags.length > 0) {
    return String(item.tags[0]);
  }

  return "Malicious URL";
};

const explainThreat = (item) => {
  const threat = getThreatLabel(item).toLowerCase();

  if (threat.includes("phish")) {
    return "Potential phishing activity. Such pages may imitate legitimate services to steal passwords, banking information, or other personal details.";
  }

  if (
    threat.includes("ransom") ||
    threat.includes("malware") ||
    threat.includes("trojan")
  ) {
    return "Potential malware-related activity. Visiting malicious sites or downloading their files may expose your device to harmful software.";
  }

  if (threat.includes("stealer")) {
    return "Potential information-stealing malware activity. These threats may attempt to collect saved passwords, browser data, or other sensitive information.";
  }

  return "This URL is listed in the threat-intelligence feed. Avoid opening it unless you have the appropriate security tools and expertise.";
};

const getStatus = (item) => {
  const status = String(item?.url_status || item?.status || "").toLowerCase();

  if (status.includes("online")) return "online";
  if (status.includes("offline")) return "offline";

  return "unknown";
};

const getItemDate = (item) =>
  item?.dateAdded ||
  item?.date_added ||
  item?.date ||
  item?.lastOnline ||
  item?.last_online ||
  "";

export default function ThreatAwareness() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchThreatData = useCallback(async () => {
    try {
      setError("");

      const response = await api.get("/api/public/threat-awareness");
      const payload = response?.data;

      if (!payload || typeof payload !== "object") {
        throw new Error("The server returned an invalid response.");
      }

      setData(payload);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Threat awareness fetch error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load threat intelligence right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThreatData();

    const interval = setInterval(fetchThreatData, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchThreatData]);

  const items = useMemo(
    () => (Array.isArray(data?.items) ? data.items : []),
    [data],
  );

  const stats = useMemo(() => {
    const online = items.filter((item) => getStatus(item) === "online").length;
    const offline = items.filter(
      (item) => getStatus(item) === "offline",
    ).length;
    const unknown = items.length - online - offline;

    const todayKey = getDateKey(new Date());

    const addedToday = items.filter(
      (item) => getDateKey(getItemDate(item)) === todayKey,
    ).length;

    return {
      total: data?.stats?.returned ?? items.length,
      online: data?.stats?.online ?? online,
      offline: data?.stats?.offline ?? offline,
      unknown,
      addedToday: data?.stats?.addedToday ?? addedToday,
    };
  }, [data, items]);

  // Count records by date for the last seven calendar days.
  const trendData = useMemo(() => {
    const days = [];

    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      date.setUTCDate(date.getUTCDate() - offset);

      const key = getDateKey(date);

      days.push({
        key,
        label: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          timeZone: "UTC",
        }),
        count: 0,
      });
    }

    const counts = new Map(days.map((day) => [day.key, 0]));

    items.forEach((item) => {
      const key = getDateKey(getItemDate(item));

      if (counts.has(key)) {
        counts.set(key, counts.get(key) + 1);
      }
    });

    return days.map((day) => ({
      ...day,
      count: counts.get(day.key) || 0,
    }));
  }, [items]);

  const maxTrendCount = Math.max(1, ...trendData.map((day) => day.count));

  // Group records by the threat labels supplied by the feed.
  const categoryData = useMemo(() => {
    const counts = new Map();

    items.forEach((item) => {
      const label = getThreatLabel(item);
      counts.set(label, (counts.get(label) || 0) + 1);
    });

    return [...counts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [items]);

  const maxCategoryCount = Math.max(
    1,
    ...categoryData.map((item) => item.count),
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const itemStatus = getStatus(item);

      const matchesStatus =
        statusFilter === "all" || itemStatus === statusFilter;

      const searchableText = [
        item?.url,
        item?.threat,
        item?.host,
        item?.reporter,
        ...(Array.isArray(item?.tags) ? item.tags : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchableText.includes(query);
    });
  }, [items, search, statusFilter]);

  const displayedItems = filteredItems.slice(0, 30);

  const handleRetry = () => {
    setLoading(true);
    fetchThreatData();
  };

  return (
    <main className="threat-awareness">
      <section className="threat-hero">
        <div className="threat-hero-content">
          <span className="threat-eyebrow">
            CYBERCRIME SOLUTIONS · PUBLIC INTELLIGENCE
          </span>

          <h1>
            Threat <span>Awareness</span>
          </h1>

          <p>
            Explore reported malicious URLs, understand common online threats,
            and learn how to protect yourself against suspicious websites.
          </p>

          <div className="threat-hero-actions">
            <a href="#threat-feed" className="threat-primary-btn">
              Explore threat feed <span aria-hidden="true">↗</span>
            </a>

            <a href="#safety-tips" className="threat-secondary-btn">
              Security tips
            </a>
          </div>

          <div className="threat-data-source">
            <span className="threat-live-dot" />
            <span>
              {lastUpdated
                ? `Last refreshed ${lastUpdated.toLocaleTimeString("en-IN")}`
                : "Threat intelligence dashboard"}
            </span>
          </div>
        </div>

        <div className="threat-hero-visual" aria-hidden="true">
          <div className="threat-orbit orbit-one" />
          <div className="threat-orbit orbit-two" />

          <div className="threat-shield">
            <span>⌑</span>
            <div className="shield-check">✓</div>
          </div>

          <div className="threat-floating-card floating-card-top">
            <span className="floating-card-icon">⌁</span>
            <div>
              <strong>Threat monitoring</strong>
              <small>Public intelligence feed</small>
            </div>
          </div>

          <div className="threat-floating-card floating-card-bottom">
            <span className="floating-card-icon">✓</span>
            <div>
              <strong>Stay informed</strong>
              <small>Think before you click</small>
            </div>
          </div>
        </div>
      </section>

      <section className="threat-content">
        <div className="threat-section-heading">
          <div>
            <span className="threat-section-kicker">CURRENT OVERVIEW</span>
            <h2>Threat intelligence at a glance</h2>
            <p>
              A snapshot of the records returned by the current threat feed.
            </p>
          </div>

          <button
            type="button"
            className="threat-refresh-btn"
            onClick={handleRetry}
            disabled={loading}
          >
            <span aria-hidden="true">↻</span>{" "}
            {loading ? "Refreshing..." : "Refresh data"}
          </button>
        </div>

        {error && (
          <div className="threat-error" role="alert">
            <div>
              <strong>Could not load threat data</strong>
              <p>{error}</p>
            </div>
            <button type="button" onClick={handleRetry}>
              Try again
            </button>
          </div>
        )}

        <div className="threat-stats-grid">
          <article className="threat-stat-card">
            <div className="threat-stat-icon stat-icon-blue">⌘</div>
            <span className="threat-stat-label">Feed records</span>
            <strong>{loading && !data ? "—" : stats.total}</strong>
            <small>Records returned by the feed</small>
          </article>

          <article className="threat-stat-card">
            <div className="threat-stat-icon stat-icon-red">!</div>
            <span className="threat-stat-label">Online URLs</span>
            <strong>{loading && !data ? "—" : stats.online}</strong>
            <small>Reported as online by the feed</small>
          </article>

          <article className="threat-stat-card">
            <div className="threat-stat-icon stat-icon-green">✓</div>
            <span className="threat-stat-label">Offline URLs</span>
            <strong>{loading && !data ? "—" : stats.offline}</strong>
            <small>Reported as offline by the feed</small>
          </article>

          <article className="threat-stat-card">
            <div className="threat-stat-icon stat-icon-yellow">◷</div>
            <span className="threat-stat-label">Added today</span>
            <strong>{loading && !data ? "—" : stats.addedToday}</strong>
            <small>Matching today's available date fields</small>
          </article>
        </div>

        <div className="threat-notice">
          <span className="notice-icon" aria-hidden="true">
            ⓘ
          </span>
          <p>
            <strong>How to interpret these figures:</strong> these numbers
            describe records returned by the configured threat-intelligence
            feed. They are not a count of all cybercrime incidents, all
            registered complaints, or all scams worldwide. A URL marked offline
            may still be unsafe.
          </p>
        </div>

        <section className="threat-trends">
          <div className="threat-section-heading chart-heading">
            <div>
              <span className="threat-section-kicker">FEED ANALYTICS</span>
              <h2>Threat activity trends</h2>
              <p>
                A date-based view of records currently available in the feed.
              </p>
            </div>
          </div>

          <div className="threat-chart-panel">
            <div className="threat-chart-title">
              <div>
                <h3>Records by date</h3>
                <p>Last 7 calendar days</p>
              </div>
              <span className="chart-badge">7 DAYS</span>
            </div>

            {loading && !data ? (
              <div className="threat-chart-empty">Loading chart data...</div>
            ) : (
              <div className="threat-chart">
                {trendData.map((day) => (
                  <div className="threat-chart-column" key={day.key}>
                    <span className="chart-value">{day.count}</span>
                    <div className="chart-bar-track">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${
                            day.count > 0
                              ? Math.max(8, (day.count / maxTrendCount) * 100)
                              : 0
                          }%`,
                        }}
                        title={`${day.label}: ${day.count} records`}
                      />
                    </div>
                    <span className="chart-date">{day.label}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="chart-footnote">
              This chart counts records in the currently returned feed that have
              a usable date. It is not a historical count of all threats
              reported on each day.
            </p>
          </div>

          <div className="threat-breakdowns">
            <div className="threat-breakdown-panel">
              <div className="threat-chart-title">
                <div>
                  <h3>URL status breakdown</h3>
                  <p>Based on the current returned records</p>
                </div>
              </div>

              {[
                {
                  label: "Online",
                  count: stats.online,
                  className: "status-online",
                },
                {
                  label: "Offline",
                  count: stats.offline,
                  className: "status-offline",
                },
                {
                  label: "Unknown",
                  count: stats.unknown,
                  className: "status-unknown",
                },
              ].map((status) => {
                const percentage = items.length
                  ? (status.count / items.length) * 100
                  : 0;

                return (
                  <div className="status-breakdown-row" key={status.label}>
                    <div className="status-breakdown-label">
                      <span className={`status-dot ${status.className}`} />
                      <span>{status.label}</span>
                      <strong>{status.count}</strong>
                    </div>

                    <div className="breakdown-track">
                      <div
                        className={`breakdown-fill ${status.className}`}
                        style={{ width: `${Math.min(100, percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="threat-breakdown-panel">
              <div className="threat-chart-title">
                <div>
                  <h3>Top threat labels</h3>
                  <p>Labels present in the returned feed</p>
                </div>
              </div>

              {categoryData.length ? (
                categoryData.map((category) => (
                  <div className="category-breakdown-row" key={category.label}>
                    <div className="category-breakdown-label">
                      <span title={category.label}>{category.label}</span>
                      <strong>{category.count}</strong>
                    </div>

                    <div className="breakdown-track">
                      <div
                        className="breakdown-fill category-fill"
                        style={{
                          width: `${
                            (category.count / maxCategoryCount) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="threat-chart-empty">
                  No threat labels are available.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="threat-feed-section" id="threat-feed">
          <div className="threat-section-heading">
            <div>
              <span className="threat-section-kicker">THREAT DATABASE</span>
              <h2>Recently reported malicious URLs</h2>
              <p>Search and filter the records returned by the threat feed.</p>
            </div>

            <span className="threat-result-count">
              {filteredItems.length} record
              {filteredItems.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="threat-filter-bar">
            <label className="threat-search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search URL, host, or threat type..."
                aria-label="Search threat records"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>

            <label className="threat-status-filter">
              <span>Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by URL status"
              >
                <option value="all">All statuses</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="unknown">Unknown</option>
              </select>
            </label>
          </div>

          {loading && !data ? (
            <div className="threat-empty-state">
              <div className="threat-loading-spinner" />
              <h3>Loading threat intelligence</h3>
              <p>Fetching the latest available records...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="threat-empty-state">
              <div className="threat-empty-icon">⌕</div>
              <h3>No matching records found</h3>
              <p>
                Try a different search term or select another status filter.
              </p>
            </div>
          ) : (
            <div className="threat-record-list">
              {displayedItems.map((item, index) => {
                const status = getStatus(item);
                const tags = Array.isArray(item?.tags) ? item.tags : [];

                return (
                  <article
                    className="threat-record-card"
                    key={item?.id || item?.url || `${index}`}
                  >
                    <div className="threat-record-top">
                      <div className="threat-record-icon">⚠</div>

                      <div className="threat-record-main">
                        <div className="threat-record-heading">
                          <h3>{getThreatLabel(item)}</h3>
                          <span className={`threat-status-badge ${status}`}>
                            <span className="status-dot" />
                            {status}
                          </span>
                        </div>

                        <p className="threat-record-url">
                          {item?.url || item?.host || "URL unavailable"}
                        </p>

                        <p className="threat-record-explanation">
                          {explainThreat(item)}
                        </p>

                        <div className="threat-record-meta">
                          <span>
                            <span aria-hidden="true">◷</span>{" "}
                            {formatDate(getItemDate(item))}
                          </span>

                          {item?.host && (
                            <span>
                              <span aria-hidden="true">⌘</span> {item.host}
                            </span>
                          )}
                        </div>

                        {tags.length > 0 && (
                          <div className="threat-tags">
                            {tags.slice(0, 5).map((tag, tagIndex) => (
                              <span
                                className="threat-tag"
                                key={`${tag}-${tagIndex}`}
                              >
                                {String(tag)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="threat-record-actions">
                      <span className="threat-record-warning">
                        Do not visit suspicious URLs
                      </span>

                      <a
                        href="https://urlhaus.abuse.ch/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="threat-reference-link"
                      >
                        View source ↗
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="threat-safety-section" id="safety-tips">
          <div className="threat-section-heading">
            <div>
              <span className="threat-section-kicker">STAY PROTECTED</span>
              <h2>Build safer online habits</h2>
              <p>
                Small security habits can make a big difference in preventing
                online fraud and malware infections.
              </p>
            </div>
          </div>

          <div className="threat-safety-grid">
            {SAFETY_TIPS.map((tip) => (
              <article className="threat-safety-card" key={tip.title}>
                <div className="safety-tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="threat-report-cta">
          <div>
            <span className="threat-section-kicker">NEED HELP?</span>
            <h2>Think you have encountered a cybercrime?</h2>
            <p>
              Do not interact further with the suspicious sender or website.
              Preserve relevant evidence and use official reporting channels.
            </p>
          </div>

          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="threat-primary-btn"
          >
            Visit official portal ↗
          </a>
        </section>

        <footer className="threat-footer">
          <p>
            Threat data source:{" "}
            <a
              href="https://urlhaus.abuse.ch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              URLhaus by abuse.ch
            </a>
          </p>

          <p>
            Threat intelligence is informational and may be incomplete or
            delayed. Always verify suspicious activity through trusted sources.
          </p>
        </footer>
      </section>
    </main>
  );
}
