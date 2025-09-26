import React from "react";
import "./CSS/Secure.css";
import facebook from "../Components/Assets/facebook-app-symbol.png";
import instagram from "../Components/Assets/instagram.png";
import Twitter from "../Components/Assets/twitter.png";
import youtube from "../Components/Assets/youtube.png";
import { Link } from "react-router-dom";
export const Secure = () => {
  return (
    <div className="heading1">
      <h2>1. Cyber Hygiene for cyber space</h2>
      <p>
        Regular Software Updates: Keep all software, including operating
        systems, web browsers, and applications, up to date with the latest
        security patches and updates. Regularly applying patches helps protect
        against known vulnerabilities and exploits.
      </p>
      <p>
        Enable Two-Factor Authentication (2FA): Enable two-factor authentication
        whenever possible, which adds an extra layer of security by requiring a
        second form of verification, such as a code sent to your phone, in
        addition to your password.
      </p>
      <h3>2. Financial Fraud</h3>
      <p>
        Identity Theft: Identity theft involves stealing personal information,
        such as Social Security numbers, credit card details, or bank account
        information, to impersonate individuals or access their financial
        accounts without authorization.
      </p>
      <p>
        Credit Card Fraud: Credit card fraud occurs when unauthorized
        transactions are made using someone else's credit card information. This
        can involve physical theft of cards, card skimming at ATMs or
        point-of-sale terminals, or online theft through phishing or data
        breaches.
      </p>
      <h4>3. Job Fraud</h4>
      <p>
        Advance Fee Scams: In advance fee scams, fraudsters pose as recruiters
        or employers offering attractive job opportunities. They may request
        payment upfront for supposed expenses such as application fees, training
        materials, background checks, or visa processing. After receiving the
        payment, the fraudsters disappear, and the promised job never
        materializes.
      </p>
      <p>
        Work-from-Home Scams: Work-from-home scams lure individuals with
        promises of easy money and flexible hours. These schemes often involve
        fraudulent job postings for tasks such as envelope stuffing, processing
        payments, or assembling products from home. Victims may be required to
        pay for startup kits or training materials, only to discover that the
        work is nonexistent or poorly compensated.
      </p>
      <h5>4. Matrimonial fraud</h5>
      <p>
        Romance Scams: Romance scams typically begin on online dating websites
        or social media platforms, where fraudsters create fake profiles to
        establish romantic relationships with unsuspecting individuals. They
        build trust and affection over time before fabricating stories to
        request money for various reasons, such as medical emergencies, travel
        expenses, or financial difficulties. Once the victim sends money, the
        fraudster disappears or continues to extort funds.
      </p>
      <p>
        Green Card or Visa Fraud: In some cases, individuals may enter into sham
        marriages with foreign nationals solely for the purpose of obtaining
        residency, citizenship, or immigration benefits. The fraudster may
        promise marriage or a romantic relationship in exchange for financial
        compensation or other incentives, without genuine intentions of forming
        a lasting partnership.
      </p>
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
