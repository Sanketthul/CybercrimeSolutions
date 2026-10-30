import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./CSS/AdminFeedback.css";

function AdminFeedback() {
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const loadFeedback = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/api/feedbacks");

      if (Array.isArray(response.data)) {
        setFeedbacks(response.data);
      } else {
        setFeedbacks([]);
      }
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        navigate("/sign-in", { replace: true });
        return;
      }

      if (status === 403) {
        setError("Access denied. Only administrators can view feedback.");
        return;
      }

      setError(
        err.response?.data?.error ||
          "Unable to load feedback. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const filteredFeedbacks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return feedbacks;

    return feedbacks.filter((feedback) =>
      [feedback.name, feedback.email, feedback.subject, feedback.message].some(
        (value) =>
          String(value || "")
            .toLowerCase()
            .includes(query),
      ),
    );
  }, [feedbacks, search]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="admin-feedback-page">
      <section className="admin-feedback-header">
        <div>
          <span className="admin-feedback-eyebrow">
            ADMINISTRATION / USER FEEDBACK
          </span>
          <h1>Feedback Center</h1>
          <p>Review suggestions, messages and feedback submitted by users.</p>
        </div>

        <button
          type="button"
          className="admin-feedback-refresh"
          onClick={loadFeedback}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh"}
        </button>
      </section>

      <section className="admin-feedback-stats">
        <article className="admin-feedback-stat">
          <span>Total received</span>
          <strong>{feedbacks.length}</strong>
          <small>Feedback records returned by the server</small>
        </article>

        <article className="admin-feedback-stat">
          <span>Search results</span>
          <strong>{filteredFeedbacks.length}</strong>
          <small>Matching feedback messages</small>
        </article>
      </section>

      <section className="admin-feedback-content">
        <div className="admin-feedback-toolbar">
          <div>
            <h2>Received messages</h2>
            <p>Newest submissions appear first.</p>
          </div>

          <input
            type="search"
            className="admin-feedback-search"
            placeholder="Search name, email, subject or message..."
            aria-label="Search feedback"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {error && (
          <div className="admin-feedback-error" role="alert">
            <p>{error}</p>
            <button type="button" onClick={loadFeedback}>
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="admin-feedback-state">
            <span className="admin-feedback-spinner" />
            <p>Loading user feedback...</p>
          </div>
        ) : !error && filteredFeedbacks.length === 0 ? (
          <div className="admin-feedback-state">
            <span className="admin-feedback-empty-icon">✉</span>
            <h3>
              {search ? "No matching feedback" : "No feedback received yet"}
            </h3>
            <p>
              {search
                ? "Try another search term."
                : "User submissions will appear here when they are received."}
            </p>
          </div>
        ) : (
          <div className="admin-feedback-list">
            {filteredFeedbacks.map((feedback) => (
              <article className="admin-feedback-card" key={feedback._id}>
                <div className="admin-feedback-card-top">
                  <div className="admin-feedback-avatar">
                    {(feedback.name || "U").trim().charAt(0).toUpperCase()}
                  </div>

                  <div className="admin-feedback-person">
                    <h3>{feedback.name || "Unknown user"}</h3>
                    <a href={`mailto:${feedback.email}`}>
                      {feedback.email || "No email provided"}
                    </a>
                  </div>

                  <time className="admin-feedback-date">
                    {formatDate(feedback.createdAt)}
                  </time>
                </div>

                <div className="admin-feedback-subject">
                  {feedback.subject || "No subject"}
                </div>

                <p className="admin-feedback-message">
                  {feedback.message || "No message provided"}
                </p>

                <div className="admin-feedback-card-footer">
                  <span className="admin-feedback-received">
                    <span /> Received
                  </span>

                  <button
                    type="button"
                    className="admin-feedback-view"
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {selectedFeedback && (
        <div
          className="admin-feedback-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedFeedback(null);
            }
          }}
        >
          <section
            className="admin-feedback-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-feedback-modal-title"
          >
            <div className="admin-feedback-modal-header">
              <div>
                <span className="admin-feedback-eyebrow">
                  SUBMISSION DETAILS
                </span>
                <h2 id="admin-feedback-modal-title">
                  {selectedFeedback.subject || "User feedback"}
                </h2>
              </div>

              <button
                type="button"
                className="admin-feedback-close"
                aria-label="Close details"
                onClick={() => setSelectedFeedback(null)}
              >
                ×
              </button>
            </div>

            <div className="admin-feedback-detail">
              <span>Submitted by</span>
              <strong>{selectedFeedback.name || "Unknown user"}</strong>
            </div>

            <div className="admin-feedback-detail">
              <span>Email address</span>
              <a href={`mailto:${selectedFeedback.email}`}>
                {selectedFeedback.email || "Not provided"}
              </a>
            </div>

            <div className="admin-feedback-detail">
              <span>Date received</span>
              <strong>{formatDate(selectedFeedback.createdAt)}</strong>
            </div>

            <div className="admin-feedback-detail admin-feedback-full-message">
              <span>Feedback message</span>
              <p>{selectedFeedback.message || "No message provided"}</p>
            </div>

            <div className="admin-feedback-modal-actions">
              {selectedFeedback.email && (
                <a
                  className="admin-feedback-reply"
                  href={`mailto:${selectedFeedback.email}?subject=${encodeURIComponent(
                    `Re: ${selectedFeedback.subject || "Your feedback"}`,
                  )}`}
                >
                  Reply by email
                </a>
              )}

              <button
                type="button"
                className="admin-feedback-close-button"
                onClick={() => setSelectedFeedback(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default AdminFeedback;
