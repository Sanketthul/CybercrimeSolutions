import React, { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api";
import "./CSS/threatAwareness.css";

const FEED_LIMIT = 30;
const BOOKMARK_STORAGE_KEY = "scam-awareness-bookmarks";

const SCAM_ARTICLES = [
  {
    id: "upi-collect",
    title: "UPI and Payment Request Scams",
    category: "UPI & Payments",
    icon: "💳",
    severity: "High",
    summary:
      "Scammers may send payment requests, fake QR codes, or pretend to help you receive money.",
    example:
      "Someone claims they need to refund you and asks you to approve a UPI request or scan a QR code.",
    redFlags: [
      "You are asked to enter your UPI PIN to receive money.",
      "A stranger asks you to approve an unexpected collect request.",
      "Someone pressures you to scan a QR code for a refund or prize.",
    ],
    steps: [
      "Never enter your UPI PIN to receive money. A PIN is used to authorize a payment.",
      "Reject unexpected payment requests and verify the sender independently.",
      "Open your banking or UPI app directly to check transactions.",
      "If you lose money, contact your bank or payment provider immediately.",
      "In India, report suspected financial cyber fraud promptly by calling 1930 and visiting cybercrime.gov.in.",
    ],
  },
  {
    id: "job-task",
    title: "Fake Jobs and Task Scams",
    category: "Job Scams",
    icon: "💼",
    severity: "High",
    summary:
      "Fraudsters offer easy online earnings, ratings, reviews, or remote work and later demand deposits.",
    example:
      "A recruiter offers high earnings for simple online tasks, pays a small amount initially, and then asks you to deposit money to unlock larger tasks.",
    redFlags: [
      "You must pay a registration fee or deposit to start earning.",
      "The recruiter guarantees unusually high income for little work.",
      "Communication happens only through unverified accounts.",
      "You are asked to deposit more money to withdraw your supposed earnings.",
    ],
    steps: [
      "Verify the company, recruiter, official website, and job listing.",
      "Do not pay a deposit to unlock tasks or withdraw earnings.",
      "Never share banking passwords, OTPs, or remote-access permissions.",
      "Keep screenshots, payment records, phone numbers, and chat history.",
      "Report financial loss promptly through your bank and India's cybercrime reporting channels.",
    ],
  },
  {
    id: "digital-arrest",
    title: "Digital Arrest and Impersonation Scams",
    category: "Impersonation",
    icon: "📱",
    severity: "High",
    summary:
      "Scammers impersonate police, government officials, or investigators to frighten victims into transferring money.",
    example:
      "A caller says your identity or parcel is involved in a crime and insists you must remain on a video call and transfer money.",
    redFlags: [
      "A caller threatens immediate arrest unless you pay.",
      "You are told not to contact family, your bank, or the police.",
      "Someone demands money for a supposed investigation or clearance.",
      "The caller uses fake documents, uniforms, or video-call backgrounds to appear official.",
    ],
    steps: [
      "Stay calm and do not transfer money under pressure.",
      "End the call and independently find the official agency's contact details.",
      "Do not share OTPs, passwords, banking details, or identity documents with an unverified caller.",
      "Save call details, messages, account information, and any payment evidence.",
      "Report suspected fraud to the appropriate authorities.",
    ],
  },
  {
    id: "phishing-kyc",
    title: "Phishing, Fake KYC and Account Alerts",
    category: "Phishing",
    icon: "🎣",
    severity: "High",
    summary:
      "Fake messages and websites imitate banks, delivery companies, services, or government portals to steal credentials.",
    example:
      "You receive a message saying your bank account or SIM will be blocked unless you immediately open a link and update your details.",
    redFlags: [
      "The message creates urgency or threatens account suspension.",
      "The link has a misspelled or unfamiliar domain.",
      "A website asks for an OTP, password, PIN, or card security code unexpectedly.",
      "The sender asks you to install an unknown app or file.",
    ],
    steps: [
      "Avoid opening suspicious links or attachments.",
      "Visit the official website or app by typing its address yourself.",
      "Never share OTPs, passwords, or your UPI PIN with callers or message senders.",
      "If you entered a password, change it through the official service and secure related accounts.",
      "Contact your bank immediately if payment details or banking access may be compromised.",
    ],
  },
  {
    id: "investment",
    title: "Investment, Trading and Crypto Scams",
    category: "Investment Scams",
    icon: "📈",
    severity: "High",
    summary:
      "Fraudulent schemes use fake profits, celebrity endorsements, trading groups, or guaranteed-return claims to attract deposits.",
    example:
      "A group shows impressive profits on a website or app but demands additional fees before allowing withdrawals.",
    redFlags: [
      "Returns are guaranteed or described as risk-free.",
      "You must recruit others or deposit more to unlock withdrawals.",
      "The platform cannot be independently verified or is impersonating a legitimate company.",
      "A stranger pressures you to invest immediately.",
    ],
    steps: [
      "Verify financial firms and intermediaries through the relevant official regulator.",
      "Do not rely on screenshots of profits or testimonials provided by the promoter.",
      "Avoid transferring money to personal accounts or unfamiliar wallets.",
      "Do not pay additional unexplained fees to recover supposed investment profits.",
      "Keep transaction records and report suspected fraud to your bank and the appropriate authorities.",
    ],
  },
];

const SAFETY_TIPS = [
  {
    icon: "🔐",
    title: "Protect your accounts",
    text: "Use unique passwords, enable multi-factor authentication, and never share OTPs or PINs.",
  },
  {
    icon: "🔗",
    title: "Verify links before opening",
    text: "Check the complete domain and use official apps or websites for sensitive transactions.",
  },
  {
    icon: "⏸️",
    title: "Pause before paying",
    text: "Urgency, threats, prizes, and guaranteed returns are reasons to stop and verify.",
  },
  {
    icon: "📂",
    title: "Keep evidence",
    text: "Save transaction IDs, messages, phone numbers, email headers, and screenshots when safe to do so.",
  },
];

const CATEGORIES = [
  "All",
  ...new Set(SCAM_ARTICLES.map((article) => article.category)),
];

function readBookmarks() {
  try {
    const saved = localStorage.getItem(BOOKMARK_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getThreatDate(item) {
  return (
    item?.dateAdded ||
    item?.date_added ||
    item?.date ||
    item?.firstSeen ||
    item?.first_seen ||
    null
  );
}

function getThreatUrl(item) {
  return (
    item?.url ||
    item?.threat ||
    item?.malicious_url ||
    item?.host ||
    item?.domain ||
    "URL not provided"
  );
}

function getThreatStatus(item) {
  return item?.url_status || item?.status || item?.threat_status || "Unknown";
}

function getThreatTags(item) {
  const tags = item?.tags;

  if (Array.isArray(tags)) {
    return tags
      .map((tag) =>
        typeof tag === "string" ? tag : tag?.tag || tag?.name || "",
      )
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function explainThreat(item) {
  const tags = getThreatTags(item).join(" ").toLowerCase();
  const text = `${getThreatUrl(item)} ${tags}`.toLowerCase();

  if (/phish/.test(text)) {
    return "Potential phishing activity. The URL may be used to impersonate a legitimate service or collect sensitive information.";
  }

  if (/malware|payload|trojan|ransomware/.test(text)) {
    return "Associated with a malware-related threat. Avoid visiting the URL or downloading files from it.";
  }

  if (/botnet|c2|command.?and.?control/.test(text)) {
    return "Associated with potentially harmful infrastructure used to communicate with compromised devices.";
  }

  if (/fraud|scam/.test(text)) {
    return "Flagged as potentially fraudulent. Verify any related message or website through an independent, official source.";
  }

  return "This URL appears in the threat intelligence feed. Avoid opening it and verify any related communication independently.";
}

function getFeedFromResponse(response) {
  const body = response?.data ?? response;

  const candidates = [
    body?.threats,
    body?.urls,
    body?.data?.threats,
    body?.data?.urls,
    body?.data?.results,
    body?.results,
    body?.items,
    body?.data,
  ];

  return candidates.find(Array.isArray) || [];
}

function getFeedMetadata(response) {
  const body = response?.data ?? response;

  return {
    source: body?.source || body?.data?.source || "URLhaus",
    lastUpdated:
      body?.lastUpdated ||
      body?.last_updated ||
      body?.data?.lastUpdated ||
      body?.data?.last_updated ||
      null,
    total:
      body?.total ??
      body?.count ??
      body?.data?.total ??
      body?.data?.count ??
      null,
  };
}

function getDateKey(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString().slice(0, 10);
}

function getCategory(item) {
  const tags = getThreatTags(item).join(" ").toLowerCase();

  if (tags.includes("phish")) return "Phishing";
  if (/malware|trojan|ransomware|payload/.test(tags)) return "Malware";
  if (/botnet|c2|command/.test(tags)) return "Botnet";
  if (/fraud|scam/.test(tags)) return "Fraud / Scam";

  return "Other";
}

function getStatusClass(status) {
  const normalized = String(status).toLowerCase();

  if (normalized.includes("online")) return "status-online";
  if (normalized.includes("offline")) return "status-offline";
  if (normalized.includes("unknown")) return "status-unknown";

  return "status-default";
}

function getSafeExternalUrl(value) {
  if (!value || typeof value !== "string") return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

export default function ThreatAwareness() {
  const [activeSection, setActiveSection] = useState("awareness");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState(readBookmarks);
  const [shareMessage, setShareMessage] = useState("");

  const [threats, setThreats] = useState([]);
  const [feedMetadata, setFeedMetadata] = useState({
    source: "URLhaus",
    lastUpdated: null,
    total: null,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [feedError, setFeedError] = useState("");

  const loadThreats = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setFeedError("");

    try {
      const response = await api.get("/api/public/threat-awareness");
      const items = getFeedFromResponse(response);
      const metadata = getFeedMetadata(response);

      setThreats(items);
      setFeedMetadata({
        ...metadata,
        lastUpdated: metadata.lastUpdated || new Date().toISOString(),
      });
    } catch (error) {
      console.error("Unable to load threat intelligence:", error);

      setFeedError(
        "The threat intelligence feed could not be loaded. Check your connection and try refreshing.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadThreats();
  }, [loadThreats]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.warn("Could not save scam awareness bookmarks:", error);
    }
  }, [bookmarks]);

  const toggleBookmark = useCallback((articleId) => {
    setBookmarks((current) =>
      current.includes(articleId)
        ? current.filter((id) => id !== articleId)
        : [...current, articleId],
    );
  }, []);

  const filteredArticles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return SCAM_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      const searchableText = [
        article.title,
        article.category,
        article.summary,
        article.example,
        ...article.redFlags,
        ...article.steps,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      const matchesBookmarks =
        !showBookmarksOnly || bookmarks.includes(article.id);

      return matchesCategory && matchesSearch && matchesBookmarks;
    });
  }, [searchTerm, selectedCategory, showBookmarksOnly, bookmarks]);

  const displayedThreats = useMemo(
    () => threats.slice(0, FEED_LIMIT),
    [threats],
  );

  const threatStats = useMemo(() => {
    const categories = {};
    const statuses = {};

    threats.forEach((item) => {
      const category = getCategory(item);
      const status = getThreatStatus(item);

      categories[category] = (categories[category] || 0) + 1;
      statuses[status] = (statuses[status] || 0) + 1;
    });

    const todayKey = getDateKey(new Date());
    const todayCount = threats.filter(
      (item) => getDateKey(getThreatDate(item)) === todayKey,
    ).length;

    const datedItems = threats.filter((item) =>
      Boolean(getDateKey(getThreatDate(item))),
    );

    const newestDate = datedItems
      .map((item) => new Date(getThreatDate(item)).getTime())
      .filter(Number.isFinite)
      .sort((a, b) => b - a)[0];

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setUTCHours(0, 0, 0, 0);
    sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 6);

    const recentCount = datedItems.filter((item) => {
      const date = new Date(getThreatDate(item));
      return date >= sevenDaysAgo;
    }).length;

    return {
      total: threats.length,
      today: todayCount,
      recent: recentCount,
      categories,
      statuses,
      newestDate: newestDate ? new Date(newestDate) : null,
    };
  }, [threats]);

  const trendData = useMemo(() => {
    const days = [];

    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      date.setUTCDate(date.getUTCDate() - i);

      const key = date.toISOString().slice(0, 10);

      days.push({
        key,
        label: date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          timeZone: "UTC",
        }),
        count: 0,
      });
    }

    const dayMap = new Map(days.map((day) => [day.key, day]));

    threats.forEach((item) => {
      const key = getDateKey(getThreatDate(item));
      const day = dayMap.get(key);

      if (day) day.count += 1;
    });

    return days;
  }, [threats]);

  const maxTrendCount = Math.max(1, ...trendData.map((day) => day.count));

  const handleShare = useCallback(async (article) => {
    const shareText = `${article.title}\n\n${article.summary}\n\nLearn how to identify the warning signs and protect yourself on the Scam Awareness Hub.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: shareText,
        });
        setShareMessage("Sharing options opened.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
        setShareMessage("Scam awareness guide copied to clipboard.");
      } else {
        setShareMessage(
          "Sharing is not supported in this browser. You can copy the guide text manually.",
        );
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        setShareMessage("Unable to share this guide right now.");
      }
    }
  }, []);

  const openEmergencyWebsite = useCallback(() => {
    window.open("https://cybercrime.gov.in/", "_blank", "noopener,noreferrer");
  }, []);

  return (
    <main className="threat-awareness-page">
      {/* Hero */}
      <section className="threat-hero">
        <div className="threat-hero-content">
          <span className="threat-eyebrow">CYBERCRIME SOLUTIONS</span>

          <h1>Stay Aware. Stay Secure.</h1>

          <p>
            Learn how online scams work, recognise warning signs, and explore
            publicly reported malicious URLs through our threat intelligence
            dashboard.
          </p>

          <div className="threat-hero-actions">
            <button
              type="button"
              className="threat-emergency-btn"
              onClick={openEmergencyWebsite}
            >
              Report Cybercrime ↗
            </button>

            <a href="tel:1930" className="threat-helpline-link">
              Call 1930 for financial cyber fraud in India
            </a>
          </div>
        </div>

        <div className="threat-hero-visual" aria-hidden="true">
          <div className="threat-hero-orbit orbit-one" />
          <div className="threat-hero-orbit orbit-two" />

          <div className="threat-hero-shield">
            <span>🛡️</span>
            <small>BE CYBER SMART</small>
          </div>

          <span className="threat-floating-icon floating-lock">🔐</span>
          <span className="threat-floating-icon floating-alert">⚠️</span>
          <span className="threat-floating-icon floating-check">✓</span>
        </div>
      </section>

      {/* Section switcher: Awareness is selected by default */}
      <div
        className="threat-section-switcher"
        role="group"
        aria-label="Choose page section"
      >
        <button
          type="button"
          className={`threat-switch-btn ${
            activeSection === "awareness" ? "active" : ""
          }`}
          onClick={() => setActiveSection("awareness")}
          aria-pressed={activeSection === "awareness"}
        >
          <span aria-hidden="true">🛡️</span>
          Scam Awareness Hub
        </button>

        <button
          type="button"
          className={`threat-switch-btn ${
            activeSection === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActiveSection("dashboard")}
          aria-pressed={activeSection === "dashboard"}
        >
          <span aria-hidden="true">📊</span>
          Threat Intelligence Dashboard
        </button>
      </div>

      {/* Awareness section */}
      {activeSection === "awareness" && (
        <section
          className="scam-awareness-section"
          aria-labelledby="scam-awareness-heading"
        >
          <div className="scam-awareness-heading">
            <div>
              <span className="scam-section-kicker">KNOW THE TRICKS</span>

              <h2 id="scam-awareness-heading">Scam Awareness Hub</h2>

              <p>
                Explore common online scams, learn how scammers operate, and
                find practical steps to protect yourself.
              </p>
            </div>

            <div className="scam-bookmark-summary">
              <span aria-hidden="true">🔖</span>
              {bookmarks.length} saved{" "}
              {bookmarks.length === 1 ? "guide" : "guides"}
            </div>
          </div>

          {/* Search and filters */}
          <div className="scam-filter-panel">
            <label htmlFor="scam-search" className="scam-search-label">
              Search scam guides
            </label>

            <div className="scam-search-row">
              <div className="scam-search-box">
                <span aria-hidden="true">⌕</span>

                <input
                  id="scam-search"
                  type="search"
                  placeholder="Try UPI, fake jobs, phishing..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />

                {searchTerm && (
                  <button
                    type="button"
                    className="scam-clear-search"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="button"
                className={`scam-bookmarks-filter ${
                  showBookmarksOnly ? "active" : ""
                }`}
                onClick={() => setShowBookmarksOnly((current) => !current)}
                aria-pressed={showBookmarksOnly}
              >
                🔖 {showBookmarksOnly ? "Show all guides" : "Saved guides"}
              </button>
            </div>

            <div
              className="scam-category-filters"
              aria-label="Filter scam guides by category"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`scam-category-chip ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {shareMessage && (
            <div className="scam-share-message" role="status">
              <span>{shareMessage}</span>
              <button
                type="button"
                onClick={() => setShareMessage("")}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}

          {/* Scam article cards */}
          <div className="scam-article-grid">
            {filteredArticles.map((article) => {
              const isExpanded = expandedArticle === article.id;
              const isBookmarked = bookmarks.includes(article.id);

              return (
                <article
                  key={article.id}
                  className={`scam-article-card ${
                    isExpanded ? "expanded" : ""
                  }`}
                >
                  <div className="scam-article-top">
                    <div className="scam-article-icon" aria-hidden="true">
                      {article.icon}
                    </div>

                    <span className="scam-severity-badge">
                      {article.severity} risk
                    </span>
                  </div>

                  <span className="scam-article-category">
                    {article.category}
                  </span>

                  <h3>{article.title}</h3>
                  <p className="scam-article-summary">{article.summary}</p>

                  <div className="scam-example-box">
                    <strong>Example</strong>
                    <p>{article.example}</p>
                  </div>

                  <div className="scam-article-actions">
                    <button
                      type="button"
                      className="scam-read-btn"
                      onClick={() =>
                        setExpandedArticle(isExpanded ? null : article.id)
                      }
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Show less" : "Learn how to stay safe"}
                      <span aria-hidden="true">{isExpanded ? " ↑" : " →"}</span>
                    </button>

                    <button
                      type="button"
                      className={`scam-icon-action ${
                        isBookmarked ? "bookmarked" : ""
                      }`}
                      onClick={() => toggleBookmark(article.id)}
                      aria-label={
                        isBookmarked
                          ? `Remove ${article.title} from saved guides`
                          : `Save ${article.title}`
                      }
                      aria-pressed={isBookmarked}
                      title={
                        isBookmarked ? "Remove bookmark" : "Save this guide"
                      }
                    >
                      {isBookmarked ? "🔖" : "♧"}
                    </button>

                    <button
                      type="button"
                      className="scam-icon-action"
                      onClick={() => handleShare(article)}
                      aria-label={`Share ${article.title}`}
                      title="Share guide"
                    >
                      ↗
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="scam-article-details">
                      <div className="scam-detail-group">
                        <h4>🚩 Warning signs to watch for</h4>
                        <ul>
                          {article.redFlags.map((flag) => (
                            <li key={flag}>{flag}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="scam-detail-group">
                        <h4>✅ What you should do</h4>
                        <ol>
                          {article.steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div className="scam-empty-state">
              <span aria-hidden="true">🔎</span>
              <h3>No guides found</h3>
              <p>
                Try another search term, select a different category, or turn
                off the saved-guides filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setShowBookmarksOnly(false);
                }}
              >
                Reset filters
              </button>
            </div>
          )}

          {/* General safety tips */}
          <section className="scam-safety-tips">
            <div className="scam-safety-heading">
              <span className="scam-section-kicker">EVERYDAY PROTECTION</span>
              <h2>Build Safer Online Habits</h2>
              <p>
                A few simple habits can reduce your exposure to common online
                scams.
              </p>
            </div>

            <div className="scam-safety-grid">
              {SAFETY_TIPS.map((tip) => (
                <article className="scam-safety-tip" key={tip.title}>
                  <span className="scam-safety-tip-icon" aria-hidden="true">
                    {tip.icon}
                  </span>
                  <h3>{tip.title}</h3>
                  <p>{tip.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Emergency support */}
          <section className="scam-emergency-panel">
            <div className="scam-emergency-icon" aria-hidden="true">
              🚨
            </div>

            <div className="scam-emergency-copy">
              <h2>Think you have been scammed?</h2>
              <p>
                Contact your bank or payment provider immediately if money or
                account access is at risk. In India, call 1930 promptly to
                report suspected financial cyber fraud and submit a complaint
                through the official National Cyber Crime Reporting Portal.
              </p>
            </div>

            <div className="scam-emergency-actions">
              <a href="tel:1930" className="scam-call-btn">
                Call 1930
              </a>

              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="scam-report-btn"
              >
                Report online ↗
              </a>
            </div>
          </section>
        </section>
      )}

      {/* Threat intelligence dashboard */}
      {activeSection === "dashboard" && (
        <section
          className="threat-content"
          aria-labelledby="threat-dashboard-heading"
        >
          <div className="threat-section-heading">
            <div>
              <span className="threat-section-kicker">
                PUBLIC THREAT INTELLIGENCE
              </span>

              <h2 id="threat-dashboard-heading">
                Threat Intelligence Dashboard
              </h2>

              <p>
                Explore malicious URLs reported by URLhaus. These figures
                describe the feed available to this application, not every
                cybercrime reported worldwide.
              </p>
            </div>

            <button
              type="button"
              className="threat-refresh-btn"
              onClick={() => loadThreats(true)}
              disabled={refreshing}
            >
              <span aria-hidden="true">↻</span>
              {refreshing ? "Refreshing..." : "Refresh data"}
            </button>
          </div>

          {feedError && (
            <div className="threat-feed-error" role="alert">
              <span>{feedError}</span>

              <button
                type="button"
                onClick={() => loadThreats(true)}
                disabled={refreshing}
              >
                Try again
              </button>
            </div>
          )}

          {/* Main statistics */}
          <div className="threat-stats-grid">
            <article className="threat-stat-card">
              <div className="threat-stat-icon">🌐</div>
              <div className="threat-stat-label">URLs loaded in feed</div>
              <div className="threat-stat-value">
                {loading ? "—" : threatStats.total.toLocaleString("en-IN")}
              </div>
              <p>Records returned by the current API response</p>
            </article>

            <article className="threat-stat-card">
              <div className="threat-stat-icon">📅</div>
              <div className="threat-stat-label">Added today</div>
              <div className="threat-stat-value">
                {loading ? "—" : threatStats.today.toLocaleString("en-IN")}
              </div>
              <p>Among loaded records with a matching date</p>
            </article>

            <article className="threat-stat-card">
              <div className="threat-stat-icon">📈</div>
              <div className="threat-stat-label">Added in last 7 days</div>
              <div className="threat-stat-value">
                {loading ? "—" : threatStats.recent.toLocaleString("en-IN")}
              </div>
              <p>Based on dates available in the returned feed</p>
            </article>

            <article className="threat-stat-card">
              <div className="threat-stat-icon">🏷️</div>
              <div className="threat-stat-label">Categories detected</div>
              <div className="threat-stat-value">
                {loading ? "—" : Object.keys(threatStats.categories).length}
              </div>
              <p>Categories inferred from the returned tags</p>
            </article>
          </div>

          {/* Trend chart */}
          <div className="threat-dashboard-grid">
            <section className="threat-panel threat-trend-panel">
              <div className="threat-panel-heading">
                <div>
                  <h3>7-Day URL Reporting Trend</h3>
                  <p>
                    Count of loaded records grouped by their available
                    date-added field.
                  </p>
                </div>

                <span className="threat-panel-icon">📊</span>
              </div>

              {loading ? (
                <div className="threat-loading-state">
                  Loading trend data...
                </div>
              ) : (
                <div className="threat-trend-chart">
                  {trendData.map((day) => {
                    const height =
                      day.count === 0
                        ? 4
                        : Math.max(10, (day.count / maxTrendCount) * 100);

                    return (
                      <div className="threat-trend-column" key={day.key}>
                        <span className="threat-trend-count">{day.count}</span>

                        <div className="threat-trend-bar-track">
                          <div
                            className="threat-trend-bar"
                            style={{ height: `${height}%` }}
                            title={`${day.label}: ${day.count} records`}
                          />
                        </div>

                        <span className="threat-trend-label">{day.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="threat-chart-note">
                This chart reflects records returned by the current feed, not
                necessarily all URLs reported to URLhaus during each day.
              </p>
            </section>

            {/* Category breakdown */}
            <section className="threat-panel threat-category-panel">
              <div className="threat-panel-heading">
                <div>
                  <h3>Threat Categories</h3>
                  <p>Classification based on available feed tags.</p>
                </div>

                <span className="threat-panel-icon">🧩</span>
              </div>

              {loading ? (
                <div className="threat-loading-state">
                  Loading categories...
                </div>
              ) : Object.keys(threatStats.categories).length === 0 ? (
                <div className="threat-empty-state">
                  No category information is available.
                </div>
              ) : (
                <div className="threat-category-list">
                  {Object.entries(threatStats.categories)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count]) => {
                      const percentage =
                        threatStats.total > 0
                          ? (count / threatStats.total) * 100
                          : 0;

                      return (
                        <div className="threat-category-row" key={category}>
                          <div className="threat-category-info">
                            <span>{category}</span>
                            <strong>{count.toLocaleString("en-IN")}</strong>
                          </div>

                          <div className="threat-category-track">
                            <div
                              className="threat-category-fill"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </section>
          </div>

          {/* Status breakdown */}
          <section className="threat-panel threat-status-panel">
            <div className="threat-panel-heading">
              <div>
                <h3>URL Status Breakdown</h3>
                <p>
                  Status labels supplied by the threat intelligence feed; these
                  are not confirmed law-enforcement outcomes.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="threat-loading-state">
                Loading status information...
              </div>
            ) : Object.keys(threatStats.statuses).length === 0 ? (
              <div className="threat-empty-state">
                No status information is available.
              </div>
            ) : (
              <div className="threat-status-grid">
                {Object.entries(threatStats.statuses)
                  .sort((a, b) => b[1] - a[1])
                  .map(([status, count]) => (
                    <div className="threat-status-card" key={status}>
                      <span
                        className={`threat-status-dot ${getStatusClass(
                          status,
                        )}`}
                      />

                      <div className="threat-status-name">{status}</div>

                      <strong>{count.toLocaleString("en-IN")}</strong>
                    </div>
                  ))}
              </div>
            )}
          </section>

          {/* Recently reported malicious URLs */}
          <section className="threat-panel threat-feed-panel">
            <div className="threat-panel-heading threat-feed-heading">
              <div>
                <span className="threat-section-kicker">LIVE FEED</span>

                <h3>Recently Reported Malicious URLs</h3>

                <p>
                  Showing up to {FEED_LIMIT} records from the API response. Do
                  not open suspicious URLs to investigate them.
                </p>
              </div>

              <span className="threat-feed-count">
                {loading ? "Loading..." : `${displayedThreats.length} shown`}
              </span>
            </div>

            {loading ? (
              <div className="threat-loading-state">
                Fetching threat intelligence...
              </div>
            ) : displayedThreats.length === 0 ? (
              <div className="threat-empty-state">
                <span aria-hidden="true">🔍</span>
                <h4>No threat records available</h4>
                <p>The feed returned no records. Try refreshing later.</p>
              </div>
            ) : (
              <div className="threat-feed-list">
                {displayedThreats.map((item, index) => {
                  const url = getThreatUrl(item);
                  const status = getThreatStatus(item);
                  const tags = getThreatTags(item);
                  const externalUrl = getSafeExternalUrl(url);

                  return (
                    <article
                      className="threat-feed-item"
                      key={
                        item?.id ||
                        item?.url_id ||
                        item?.urlhaus_reference ||
                        `${url}-${getThreatDate(item) || index}`
                      }
                    >
                      <div className="threat-feed-item-top">
                        <div className="threat-feed-url-icon">⚠️</div>

                        <div className="threat-feed-url-info">
                          <h4>
                            {externalUrl ? (
                              <a
                                href={externalUrl}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                              >
                                {url}
                              </a>
                            ) : (
                              <span>{url}</span>
                            )}
                          </h4>

                          <p>Added: {formatDate(getThreatDate(item))}</p>
                        </div>

                        <span
                          className={`threat-status-badge ${getStatusClass(
                            status,
                          )}`}
                        >
                          {status}
                        </span>
                      </div>

                      <p className="threat-feed-explanation">
                        {explainThreat(item)}
                      </p>

                      <div className="threat-feed-meta">
                        <span className="threat-category-tag">
                          {getCategory(item)}
                        </span>

                        {tags.slice(0, 4).map((tag) => (
                          <span className="threat-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!loading && threats.length > FEED_LIMIT && (
              <p className="threat-feed-limit-note">
                Showing the first {FEED_LIMIT} of{" "}
                {threats.length.toLocaleString("en-IN")} records returned by the
                API.
              </p>
            )}
          </section>

          {/* Data source and interpretation */}
          <section className="threat-source-panel">
            <div className="threat-source-icon" aria-hidden="true">
              ℹ️
            </div>

            <div>
              <h3>About this data</h3>

              <p>
                The dashboard uses the public threat-awareness endpoint backed
                by {feedMetadata.source}. URLhaus is a threat intelligence
                resource focused on malicious URLs associated with malware
                distribution. Its feed is not a complete worldwide cybercrime
                register.
              </p>

              <p>
                URL status indicates the state reported by the feed; it does not
                tell us whether a criminal case was solved, whether a victim
                recovered money, or how many people were affected. These figures
                should not be interpreted as total cybercrime incidents.
              </p>

              {feedMetadata.lastUpdated && (
                <p className="threat-source-updated">
                  Last successful data fetch:{" "}
                  {new Date(feedMetadata.lastUpdated).toLocaleString("en-IN")}
                </p>
              )}

              <a
                href="https://urlhaus.abuse.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="threat-source-link"
              >
                Visit URLhaus ↗
              </a>
            </div>
          </section>

          {/* Dashboard safety reminders */}
          <section className="threat-dashboard-safety">
            <h3>Stay safe while browsing</h3>

            <div className="threat-dashboard-safety-grid">
              <div>
                <span aria-hidden="true">🚫</span>
                <strong>Don't visit suspicious URLs</strong>
                <p>
                  A URL appearing in a threat feed should be treated cautiously.
                  Do not open it to test whether it works.
                </p>
              </div>

              <div>
                <span aria-hidden="true">🔒</span>
                <strong>Secure your accounts</strong>
                <p>
                  Use unique passwords, enable multi-factor authentication, and
                  install security updates.
                </p>
              </div>

              <div>
                <span aria-hidden="true">📣</span>
                <strong>Report financial fraud quickly</strong>
                <p>
                  In India, call 1930 promptly if you suspect online financial
                  fraud and report it through the official cybercrime portal.
                </p>
              </div>
            </div>
          </section>
        </section>
      )}
    </main>
  );
}
