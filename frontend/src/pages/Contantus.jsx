import React from "react";
import "./CSS/Contantus.css";
import { Footer } from "../Components/Footer/Footer";
import facebook from "../Components/Assets/facebook-app-symbol.png";
import instagram from "../Components/Assets/instagram.png";
import Twitter from "../Components/Assets/twitter.png";
import youtube from "../Components/Assets/youtube.png";
import { Link } from "react-router-dom";

export const Contantus = () => {
  const socialLinks = [
    {
      name: "Instagram",
      username: "@cyber_crime_solutions",
      url: "https://www.instagram.com/cyber_crime_solutions/?hl=en",
      icon: instagram,
    },
    {
      name: "YouTube",
      username: "Cyber Crime Solutions",
      url: "https://www.youtube.com/channel/UCJu2wA_pKFOJ6j10YW7q7oA",
      icon: youtube,
    },
    {
      name: "X / Twitter",
      username: "@Cyberdost215403",
      url: "https://twitter.com/Cyberdost215403",
      icon: Twitter,
    },
    {
      name: "Facebook",
      username: "Cybercrime Solutions",
      url: "https://www.facebook.com/profile.php?id=61557782943831",
      icon: facebook,
    },
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            <span className="contact-eyebrow-dot"></span>
            CYBERCRIME SOLUTIONS
          </span>

          <h1>
            We're here to <span>help you.</span>
          </h1>

          <p>
            Have a question about cyber safety or need help finding the right
            reporting resource? Explore the contact options and official support
            resources below.
          </p>

          <a href="#contact-options" className="contact-hero-button">
            Explore contact options <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="contact-hero-art" aria-hidden="true">
          <div className="contact-art-ring contact-art-ring-one"></div>
          <div className="contact-art-ring contact-art-ring-two"></div>
          <div className="contact-art-shield">
            <svg viewBox="0 0 100 100" fill="none">
              <path
                d="M50 10 82 22v24c0 21-13 35-32 44C31 81 18 67 18 46V22L50 10Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="m35 49 10 10 21-23"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="contact-art-dot contact-art-dot-one"></span>
          <span className="contact-art-dot contact-art-dot-two"></span>
        </div>
      </section>

      <main className="contact-main">
        <section className="contact-section" id="contact-options">
          <div className="contact-section-heading">
            <span className="contact-section-label">GET IN TOUCH</span>
            <h2>How can we help?</h2>
            <p>Choose the option that best matches what you need.</p>
          </div>

          <div className="contact-card-grid">
            <article className="contact-card contact-email-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m4 7 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="contact-card-kicker">GENERAL ENQUIRIES</span>
              <h3>Email Support</h3>
              <p>
                Contact us with questions, feedback, or enquiries about the
                Cybercrime Solutions platform.
              </p>

              <a
                className="contact-card-link"
                href="mailto:cybercrimesolutions3@gmail.com"
              >
                cybercrimesolutions3@gmail.com
                <span aria-hidden="true">↗</span>
              </a>
            </article>

            <article className="contact-card contact-helpline-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 3.5h3l1.5 4-2 1.8a15 15 0 0 0 5.2 5.2l1.8-2 4 1.5v3c0 1.1-.9 2-2 2C10 19 5 14 5 5.5c0-1.1.9-2 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="contact-card-kicker">REPORT CYBER FRAUD</span>
              <h3>Cyber Fraud Helpline</h3>
              <p>
                If you have experienced financial cyber fraud, contact the
                official helpline as soon as possible.
              </p>

              <a className="contact-phone-number" href="tel:1930">
                1930 <span aria-hidden="true">↗</span>
              </a>
              <span className="contact-card-note">
                India · National Cyber Crime Helpline
              </span>
            </article>

            <article className="contact-card contact-portal-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

              <span className="contact-card-kicker">
                OFFICIAL GOVERNMENT RESOURCE
              </span>
              <h3>Report Cybercrime</h3>
              <p>
                Visit India's National Cyber Crime Reporting Portal to submit a
                complaint and find official reporting resources.
              </p>

              <a
                className="contact-card-button"
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official Portal <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>

          <div className="contact-important-note">
            <div className="contact-note-icon" aria-hidden="true">
              i
            </div>
            <p>
              <strong>Important:</strong> Cybercrime Solutions is an awareness
              and guidance platform, not a government agency. For financial
              cyber fraud in India, call <strong>1930</strong> promptly and
              submit a complaint through the official portal. Keep transaction
              details and relevant evidence available.
            </p>
          </div>
        </section>

        <section className="contact-social-section">
          <div className="contact-social-heading">
            <span className="contact-section-label">STAY CONNECTED</span>
            <h2>Follow our community</h2>
            <p>
              Explore our social channels for cyber safety awareness and
              educational updates.
            </p>
          </div>

          <div className="contact-social-grid">
            {socialLinks.map((social) => (
              <a
                className="contact-social-card"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
              >
                <span className="contact-social-icon">
                  <img src={social.icon} alt="" />
                </span>

                <span className="contact-social-text">
                  <strong>{social.name}</strong>
                  <span>{social.username}</span>
                </span>

                <span className="contact-social-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-bottom-banner">
          <div>
            <span className="contact-banner-label">A SAFER DIGITAL WORLD</span>
            <h2>Awareness is the first step to protection.</h2>
            <p>
              Learn how to recognize suspicious messages, avoid online scams,
              and make safer decisions online.
            </p>
          </div>

          <Link to="/Learn About Cyber Crime" className="contact-banner-button">
            Explore Cyber Safety <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contantus;
