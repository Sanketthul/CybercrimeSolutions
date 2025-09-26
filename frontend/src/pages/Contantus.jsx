import React from "react";
import "./CSS/Contantus.css";
import facebook from "../Components/Assets/facebook-app-symbol.png";
import instagram from "../Components/Assets/instagram.png";
import Twitter from "../Components/Assets/twitter.png";
import youtube from "../Components/Assets/youtube.png";
import { Link } from "react-router-dom";
export const Contantus = () => {
  return (
    <div className="body">
      <div className="wrapper">
        <h1>Contant us</h1>
      </div>
      <div className="info">
        <h1>Email us on:- cybercrimesolutions3@gmail.com</h1>
        <h1>Cyber Crime Helpline Number:- 1930</h1>
        <p>National Cyber Crime Portal Below Link Report Complaint Here </p>
        <a href="https://cybercrime.gov.in/">https://cybercrime.gov.in/</a>
        <div className="info1">
          <h3>Social Platfrom Links</h3>
          <p>Instagram Link Below </p>
          <a href="https://www.instagram.com/cyber_crime_solutions/?hl=en">
            <p1>cyber_crime_solutions</p1>
          </a>
          <p>Youtube Link Below</p>
          <a href="https://www.youtube.com/channel/UCJu2wA_pKFOJ6j10YW7q7oA">
            <p2>Cyber Crime Solutions</p2>
          </a>
          <p>X Link Below</p>
          <a href="https://www.youtube.com/channel/UCJu2wA_pKFOJ6j10YW7q7oA">
            <p2>Cyberdost</p2>
          </a>
        </div>
      </div>
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
    </div>
  );
};
