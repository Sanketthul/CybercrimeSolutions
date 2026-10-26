import React from "react";
import "./Footer.css";
import facebook from "../Assets/facebook-app-symbol.png";
import instagram from "../Assets/instagram.png";
import twitter from "../Assets/twitter.png";
import youtube from "../Assets/youtube.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61557782943831",
      icon: facebook,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/cyber_crime_solutions/?hl=en",
      icon: instagram,
    },
    {
      name: "Twitter / X",
      url: "https://twitter.com/Cyberdost215403",
      icon: twitter,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCJu2wA_pKFOJ6j10YW7q7oA",
      icon: youtube,
    },
  ];

  const policyLinks = [
    { label: "Disclaimer", to: "/Disclaimer" },
    { label: "FAQ", to: "/FAQ" },
    { label: "Website Policies", to: "/Website Policies" },
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-name">
            <span className="footer-brand-accent">Cyber</span>
            Crime Solutions<span className="footer-brand-dot">.</span>
          </Link>

          <p className="footer-tagline">
            Stay informed. Stay alert. Stay cyber safe.
          </p>

          <p className="footer-description">
            Promoting cyber awareness and safer digital practices through
            education, useful resources, and responsible online behaviour.
          </p>
        </div>

        <div className="footer-navigation">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            {policyLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>
                  <span className="footer-link-arrow">›</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-connect">
          <h3>Connect With Us</h3>
          <p>
            Follow our social channels for cyber awareness and online safety
            information.
          </p>

          <div className="footer-social-icon">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icons-container"
                aria-label={`Visit our ${social.name} page`}
                title={social.name}
              >
                <img src={social.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright-text">
          © {currentYear} Cyber Crime Solutions. All rights reserved.
        </p>

        <Link to="/" className="footer-back-home">
          Back to home <span aria-hidden="true">↑</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
