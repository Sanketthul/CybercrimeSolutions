import React from "react";
import "./Footer.css";
import facebook from "../Assets/facebook-app-symbol.png";
import instagram from "../Assets/instagram.png";
import Twitter from "../Assets/twitter.png";
import youtube from "../Assets/youtube.png";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-links">
        <Link style={{ textDecoration: "none" }} to="/Disclaimer">
          <li>Disclaimer</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/FAQ">
          <li>FAQ</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Website Policies">
          <li>Website Policies</li>
        </Link>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <a href="https://www.facebook.com/profile.php?id=61557782943831">
            <img src={facebook} alt="" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/cyber_crime_solutions/?hl=en">
            <img src={instagram} alt="" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://twitter.com/Cyberdost215403">
            <img src={Twitter} alt="" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.youtube.com/channel/UCJu2wA_pKFOJ6j10YW7q7oA">
            <img src={youtube} alt="" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>
          Copyright @ 2025 - All Right Reserved Designed By Cyber Crime
          Solutions.
        </p>
      </div>
    </div>
  );
};
