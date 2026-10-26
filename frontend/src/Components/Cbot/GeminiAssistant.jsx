import React from "react";
import { useNavigate } from "react-router-dom";
import "./GeminiAssistant.css";

export const GeminiAssistant = ({ openChat }) => {
  const navigate = useNavigate();

  return (
    <section className="gemini-assistant-section">
      <div className="gemini-assistant-card">
        <div className="gemini-assistant-content">
          <span className="gemini-assistant-label">
            <span className="gemini-status-dot"></span>
            AI-POWERED CYBER SAFETY
          </span>

          <h2>
            Meet your <span>Gemini AI</span> Assistant
          </h2>

          <p className="gemini-assistant-description">
            Not sure if a message is a scam? Need help understanding an online
            fraud or learning how to stay safe online? Get started with our
            AI-powered cyber safety assistant.
          </p>

          <div className="gemini-assistant-features">
            <div className="gemini-feature">
              <span className="gemini-feature-icon">⌕</span>
              <div>
                <h3>Understand suspicious messages</h3>
                <p>Learn about common scam warning signs.</p>
              </div>
            </div>

            <div className="gemini-feature">
              <span className="gemini-feature-icon">↗</span>
              <div>
                <h3>Get cyber safety guidance</h3>
                <p>Explore practical steps to protect yourself online.</p>
              </div>
            </div>

            <div className="gemini-feature">
              <span className="gemini-feature-icon">✓</span>
              <div>
                <h3>Learn what to do next</h3>
                <p>Find guidance and relevant official reporting resources.</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="gemini-assistant-button"
            onClick={openChat}
          >
            Explore AI Assistant
            <span aria-hidden="true">→</span>
          </button>

          <p className="gemini-assistant-disclaimer">
            AI responses can be inaccurate. Never share passwords, OTPs, banking
            PINs, or other sensitive information.
          </p>
        </div>

        <div className="gemini-assistant-visual" aria-hidden="true">
          <div className="gemini-orbit gemini-orbit-one"></div>
          <div className="gemini-orbit gemini-orbit-two"></div>

          <div className="gemini-ai-icon">
            <svg viewBox="0 0 100 100" fill="none">
              <path
                d="M50 8 59 36 86 25 68 49 94 62 64 64 62 94 48 69 24 87 35 60 7 48 37 42 50 8Z"
                fill="currentColor"
                opacity=".95"
              />
              <circle cx="50" cy="50" r="12" fill="#F1F2EB" />
            </svg>
          </div>

          <div className="gemini-floating-card gemini-floating-card-top">
            <span className="gemini-floating-card-icon">✦</span>
            <div>
              <strong>AI Assistance</strong>
              <small>Cyber safety support</small>
            </div>
          </div>

          <div className="gemini-floating-card gemini-floating-card-bottom">
            <span className="gemini-floating-check">✓</span>
            <div>
              <strong>Stay informed</strong>
              <small>Think before you click</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeminiAssistant;
