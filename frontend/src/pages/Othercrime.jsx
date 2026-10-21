import React from "react";
import { Link } from "react-router-dom";
import OthercrimeForm from "./OthercrimeForm";
import OthercrimeList from "./OthercrimeList";
import "./CSS/Othercrime.css";

export const Othercrime = () => (
  <main className="cyber-report-page">
    <section className="report-hero">
      <div className="report-hero-inner">
        <span className="hero-chip">
          <span className="live-dot" /> CYBERCRIME SOLUTIONS / REPORTING PORTAL
        </span>
        <h1>
          Make your next step
          <br />
          <span>the right one.</span>
        </h1>
        <p>
          Report a cyber incident securely and follow its progress with a
          private tracking ID.
        </p>
        <div className="hero-trust">
          <span>✓ Private status lookup</span>
          <span>✓ Trackable case ID</span>
          <span>✓ Secure API</span>
        </div>
      </div>
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
    </section>
    <div className="report-content">
      <div className="report-column">
        <OthercrimeForm />
      </div>
      <div className="report-column">
        <OthercrimeList />
        <aside className="safety-note">
          <strong>Need urgent help?</strong>
          <p>
            If money was lost through online fraud in India, contact your bank
            immediately and call 1930. You can also report at the official
            National Cyber Crime Reporting Portal.
          </p>
          <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">
            Open official portal ↗
          </a>
        </aside>
      </div>
    </div>
    <footer className="report-footer">
      <span>© {new Date().getFullYear()} Cybercrime Solutions</span>
      <nav>
        <Link to="/Disclaimer">Disclaimer</Link>
        <Link to="/FAQ">FAQ</Link>
        <Link to="/Website Policies">Website policies</Link>
      </nav>
    </footer>
  </main>
);

export default Othercrime;
