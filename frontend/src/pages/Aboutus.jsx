import React from "react";
import "./CSS/Aboutus.css";
import facebook from "../Components/Assets/facebook-app-symbol.png";
import instagram from "../Components/Assets/instagram.png";
import Twitter from "../Components/Assets/twitter.png";
import youtube from "../Components/Assets/youtube.png";
import { Link } from "react-router-dom";
export const Aboutus = () => {
  return (
    <div className="heading">
      <div className="headingpar">
        <h1>About Us</h1>
        <p>we help people who are attack by cyber crime</p>
        <p1>and give them solutions of there problems</p1>
        <div className="main">
          <p>
            Cyber Crime Solutions is a dynamic cybersecurity firm committed to
            safeguarding individuals, enterprises, and governmental entities
            from the pervasive threats of cybercrime. With a wealth of
            experience and expertise in the field, our website comprises
            seasoned professionals with diverse backgrounds in cybersecurity,
            law enforcement, and technology. We pride ourselves on delivering
            holistic solutions that address the entire spectrum of cyber risks,
            from ransomware attacks and data breaches to social engineering
            scams and sophisticated cyber espionage.
          </p>
          <p>
            At Cyber Crime Solutions, we understand that the landscape of cyber
            threats is constantly evolving, requiring proactive and adaptive
            strategies to stay ahead of malicious actors. Leveraging
            cutting-edge technologies, advanced threat intelligence, and
            industry best practices, we tailor our services to meet the unique
            needs and challenges of each client. Whether it's conducting
            comprehensive risk assessments, deploying robust security measures,
            or providing incident response and digital forensics expertise, we
            are committed to delivering excellence and peace of mind in an
            increasingly interconnected world.
          </p>
          <p>
            At Cyber Crime Solutions, integrity, innovation, and customer
            satisfaction are at the core of everything we do. Our mission is not
            just to provide cybersecurity services but to build trusted
            partnerships that enable our clients to navigate the digital
            landscape with confidence and resilience. Whether you're a small
            business looking to fortify your defenses or a multinational
            corporation seeking enterprise-level security solutions, Cyber Crime
            Solutions is your trusted partner in the ongoing battle against
            cyber threats.
          </p>
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
