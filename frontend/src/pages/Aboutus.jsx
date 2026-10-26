import React from "react";
import "./CSS/Aboutus.css";
import { Footer } from "../Components/Footer/Footer";

import { Link } from "react-router-dom";

export const Aboutus = () => {
  return (
    <div className="about-page">
      {/* About Hero */}
      <section className="about-hero">
        <span className="about-eyebrow">ABOUT CYBERCRIME SOLUTIONS</span>

        <h1>
          Making the Digital World
          <span> Safer for Everyone.</span>
        </h1>

        <p className="about-hero-description">
          Helping people understand cybercrime, recognize online scams, and take
          informed steps to protect themselves in the digital world.
        </p>

        <div className="about-hero-tags">
          <span>Cyber Awareness</span>
          <span>Fraud Prevention</span>
          <span>Safety Education</span>
        </div>
      </section>

      {/* Main Content */}
      <main className="about-content">
        <section className="about-intro">
          <div className="about-section-label">
            <span className="about-label-line"></span>
            WHO WE ARE
          </div>

          <h2>
            Knowledge is your
            <span> first line of defence.</span>
          </h2>

          <p>
            Cybercrime Solutions is a cybersecurity awareness and education
            platform designed to help individuals better understand online
            threats. As digital services become part of everyday life, knowing
            how to recognize suspicious activity and respond safely is more
            important than ever.
          </p>

          <p>
            Our goal is to make cyber safety easier to understand through
            practical information, scam awareness resources, threat
            intelligence, and guidance on reporting cybercrime in India.
          </p>
        </section>

        {/* Mission Cards */}
        <section className="about-pillars">
          <article className="about-pillar about-pillar-green">
            <div className="about-pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="m8.5 12 2.3 2.3 4.7-4.8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Our Mission</h3>

            <p>
              To make cyber safety knowledge accessible and help people
              recognize digital risks before they become victims of scams.
            </p>
          </article>

          <article className="about-pillar about-pillar-plum">
            <div className="about-pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="8"
                  r="3.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M5 20v-1.5a7 7 0 0 1 14 0V20H5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 4.5h3M19.5 3v3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3>Our Approach</h3>

            <p>
              We explain common cyber threats in straightforward language, with
              practical examples, warning signs, and prevention tips people can
              apply in everyday life.
            </p>
          </article>

          <article className="about-pillar about-pillar-red">
            <div className="about-pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 5.5v15M8 7h8M8 11h7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3>Our Commitment</h3>

            <p>
              We aim to provide useful awareness resources and reporting
              guidance while encouraging responsible, informed, and safer online
              behaviour.
            </p>
          </article>
        </section>

        {/* Closing Banner */}
        <section className="about-cta">
          <div className="about-cta-content">
            <span>STAY INFORMED. STAY PROTECTED.</span>

            <h2>
              Your online safety
              <br />
              starts with awareness.
            </h2>

            <p>
              Explore cyber safety resources and learn how to spot the warning
              signs of online fraud.
            </p>

            <Link to="/Learn About Cyber Crime" className="about-cta-button">
              Explore Cyber Safety
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="about-cta-decoration" aria-hidden="true">
            <svg viewBox="0 0 160 160" fill="none">
              <path
                d="M80 12 135 33v37c0 36-23 61-55 78C48 131 25 106 25 70V33L80 12Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M80 30 119 45v25c0 26-15 45-39 59-24-14-39-33-39-59V45l39-15Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m61 79 13 13 27-29"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
