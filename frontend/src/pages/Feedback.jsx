import React, { useState } from "react";
import FeedbackForm from "./FeedbackForm";

import { Footer } from "../Components/Footer/Footer";
import api from "../api";
import "./CSS/Feedback.css";

export const Feedback = () => {
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addFeedback = async (feedback) => {
    setNotice("");
    setError("");
    setSubmitting(true);

    try {
      await api.post("/api/feedbacks", feedback);
      setNotice("Thank you! Your feedback was submitted successfully.");
      return true;
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Unable to submit your feedback right now. Please try again.",
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="feedback-page">
      <section className="feedback-hero">
        <div className="feedback-hero-content">
          <span className="feedback-eyebrow">
            <span className="feedback-eyebrow-dot"></span>
            YOUR VOICE MATTERS
          </span>

          <h1>
            Help us make the internet <span>safer.</span>
          </h1>

          <p>
            Your feedback helps us improve Cybercrime Solutions, make cyber
            safety information easier to understand, and create a better
            experience for everyone.
          </p>

          <a href="#feedback-form" className="feedback-hero-button">
            Share your feedback <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="feedback-hero-art" aria-hidden="true">
          <div className="feedback-art-ring feedback-art-ring-one"></div>
          <div className="feedback-art-ring feedback-art-ring-two"></div>

          <div className="feedback-art-icon">
            <svg viewBox="0 0 100 100" fill="none">
              <path
                d="M18 19h64a7 7 0 0 1 7 7v43a7 7 0 0 1-7 7H48L29 89V76h-4a7 7 0 0 1-7-7V26a7 7 0 0 1 7-7Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M34 40h32M34 53h24"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="m65 68 5 5 10-12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="feedback-art-dot feedback-art-dot-one"></span>
          <span className="feedback-art-dot feedback-art-dot-two"></span>
        </div>
      </section>

      <section className="feedback-main" id="feedback-form">
        <div className="feedback-intro">
          <span className="feedback-section-label">WE'RE LISTENING</span>
          <h2>Tell us about your experience.</h2>
          <p>
            Whether you have a suggestion, an idea, or something we could do
            better, we would like to hear from you.
          </p>
        </div>

        <div className="feedback-layout">
          <aside className="feedback-side-panel">
            <div className="feedback-side-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3 14.8 8.7 21 9.6l-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Every suggestion counts.</h3>
            <p>
              Your ideas can help us make our cyber awareness resources more
              useful, accessible, and practical.
            </p>

            <div className="feedback-benefit">
              <span className="feedback-benefit-check">✓</span>
              <span>Help improve the user experience</span>
            </div>

            <div className="feedback-benefit">
              <span className="feedback-benefit-check">✓</span>
              <span>Suggest new features and resources</span>
            </div>

            <div className="feedback-benefit">
              <span className="feedback-benefit-check">✓</span>
              <span>Help make cyber safety easier to learn</span>
            </div>

            <div className="feedback-side-note">
              <span className="feedback-side-note-mark">i</span>
              <p>
                Please avoid including passwords, OTPs, banking PINs, or other
                sensitive personal information in your feedback.
              </p>
            </div>
          </aside>

          <div className="feedback-form-panel">
            {notice && (
              <div
                className="feedback-notice feedback-notice-success"
                role="status"
              >
                <span className="feedback-notice-icon" aria-hidden="true">
                  ✓
                </span>
                <span>{notice}</span>
              </div>
            )}

            {error && (
              <div
                className="feedback-notice feedback-notice-error"
                role="alert"
              >
                <span className="feedback-notice-icon" aria-hidden="true">
                  !
                </span>
                <span>{error}</span>
              </div>
            )}

            <div className="feedback-form-heading">
              <span className="feedback-section-label">FEEDBACK FORM</span>
              <h2>Share your thoughts</h2>
              <p>Fill in the form below to send us your feedback.</p>
            </div>

            <div
              className={
                submitting
                  ? "feedback-form-content is-submitting"
                  : "feedback-form-content"
              }
            >
              <FeedbackForm addFeedback={addFeedback} />
            </div>

            {submitting && (
              <p className="feedback-submitting-message" role="status">
                Submitting your feedback...
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Feedback;
