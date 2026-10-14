import React from "react";
import "./CSS/LearnAbout.css";
import facebook from "../Components/Assets/facebook-app-symbol.png";
import instagram from "../Components/Assets/instagram.png";
import Twitter from "../Components/Assets/twitter.png";
import youtube from "../Components/Assets/youtube.png";
import { Link } from "react-router-dom";
export const LearnAbout = () => {
  const data = [
    {
      fname:
        "1. Phishing: Phishing involves tricking individuals into providing sensitive information such as usernames, passwords, credit card numbers, or other personal data by posing as a legitimate entity through emails, messages, or websites.",
    },
    {
      fname:
        "2. Insider Threats: Insider threats occur when individuals with authorized access to an organization's systems or information misuse their privileges for malicious purposes, such as stealing data, sabotaging operations, or committing fraud.",
    },
    {
      fname:
        "3. Social Engineering: Social engineering involves manipulating people into divulging confidential information or performing actions that compromise security, often through techniques such as pretexting, baiting, phishing, or impersonation.",
    },
    {
      fname:
        "4. Cyber Espionage: Cyber espionage, also known as cyber spying or cyber intelligence gathering, involves unauthorized access to sensitive information or intellectual property for espionage purposes, typically conducted by nation-states, intelligence agencies, or corporate competitors.",
    },
    {
      fname:
        "5. Eavesdropping/Sniffing: Eavesdropping or sniffing involves intercepting and monitoring network communications to capture sensitive information, such as passwords, financial details, or personal conversations, transmitted over unsecured or poorly encrypted connections.",
    },
    {
      fname:
        "6. Supply Chain Attacks: Supply chain attacks involve targeting the vulnerabilities in third-party vendors, suppliers, or partners to infiltrate the networks or systems of larger organizations, allowing attackers to gain unauthorized access or conduct espionage activities.",
    },
    {
      fname:
        "7. Denial-of-Service (DoS) Attacks: DoS attacks disrupt the availability of online services by flooding servers, networks, or websites with excessive traffic, causing them to become slow, unresponsive, or entirely inaccessible to legitimate users.",
    },
    {
      fname:
        "8. Man-in-the-Middle (MitM) Attacks: MitM attacks occur when a cybercriminal intercepts and potentially alters communication between two parties without their knowledge, allowing them to eavesdrop on sensitive information or manipulate data exchanges.",
    },
    {
      fname:
        "9. SIM Swapping: SIM swapping, also known as SIM hijacking, involves fraudulently transferring a victim's phone number to a SIM card controlled by the attacker. This allows the attacker to receive the victim's calls, messages, and authentication codes, potentially gaining access to sensitive accounts.",
    },
    {
      fname:
        "10. AI-Powered Cyber Attacks: With the advancement of artificial intelligence (AI) and machine learning (ML) technologies, cybercriminals can develop sophisticated attacks that leverage AI algorithms to automate tasks, evade detection, and adapt to security defenses.",
    },
  ];
  return (
    <div className="heading">
      <h2>Learn About Cybercrime</h2>
      <p>
        In general cybercrime may be defined as “Any unlawful act where computer
        or communication device or computer network is used to commit or
        facilitate the commission of crime”.
      </p>
      <p1>
        Below is a list for some of the cybercrimes along with their indicative
        explanation. This is to facitilate better reporting of complaints.
      </p1>
      <div className="table">
        <table>
          <thread>
            <tr>
              <th>
                Cybercrime encompasses a wide range of illegal activities
                carried out using digital means or involving computers and
                networks. Here are some common types of cybercrimes:
              </th>
            </tr>
          </thread>
          <tbody>
            {data.map((val, i) => (
              <tr>
                <td>{val.fname}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
