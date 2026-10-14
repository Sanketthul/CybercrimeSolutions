import React from "react";
import "./CSS/Cyber.css";
import facebook from "../Components/Assets/facebook-app-symbol.png";
import instagram from "../Components/Assets/instagram.png";
import Twitter from "../Components/Assets/twitter.png";
import youtube from "../Components/Assets/youtube.png";
import { Link } from "react-router-dom";
export const Cyber = () => {
  return (
    <div className="ptag1">
      <p>
        Secure online transactions are paramount in today's digital landscape to
        protect sensitive financial information and maintain trust between
        businesses and consumers.{" "}
      </p>
      <p>
        {" "}
        It's also essential for businesses to maintain PCI compliance when
        handling payment card transactions, adhering to industry standards and
        implementing secure payment processing systems. Educating customers
        about safe online shopping practices, providing guidance on creating
        strong passwords, and regularly updating security measures are vital
        steps in ensuring the security and integrity of online transactions.
      </p>
      <div className="heading3">
        <h1>1. Encryption</h1>
        <p>
          Encryption is the process of converting data into a coded form that
          can only be deciphered by authorized parties. Secure online
          transactions typically rely on encryption protocols such as SSL
          (Secure Sockets Layer) or TLS (Transport Layer Security) to encrypt
          data exchanged between a user's browser and the website's server. Look
          for HTTPS in the URL and a padlock symbol in the browser's address bar
          to indicate that a website is using encryption.
        </p>
        <h1>2. Strong Authentication</h1>
        <p>
          Implement strong authentication mechanisms to verify the identity of
          users during online transactions. This may include password-based
          authentication, biometric authentication (such as fingerprint or
          facial recognition), or two-factor authentication (2FA) that requires
          users to provide additional verification, such as a one-time code sent
          to their mobile device.
        </p>
        <h1>3. Tokenization</h1>
        <p>
          Tokenization involves replacing sensitive data, such as credit card
          numbers or bank account details, with unique tokens that have no
          intrinsic value and cannot be used for fraudulent purposes. This helps
          prevent the exposure of sensitive information in the event of a data
          breach or unauthorized access.
        </p>
        <h1>4. Fraud Detection and Prevention</h1>
        <p>
          {" "}
          Use advanced fraud detection techniques, such as machine learning
          algorithms or behavioral analytics, to identify and mitigate
          fraudulent transactions in real-time. Monitor transaction patterns,
          detect anomalies, and implement controls to prevent unauthorized
          access or fraudulent activities.
        </p>
        <h1>5. PCI Compliance</h1>
        <p>
          If your business handles payment card transactions, ensure compliance
          with the Payment Card Industry Data Security Standard (PCI DSS), which
          sets security requirements for protecting cardholder data. Implement
          secure payment processing systems, encrypt cardholder data, and adhere
          to PCI compliance guidelines to safeguard against payment card fraud.
        </p>
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
