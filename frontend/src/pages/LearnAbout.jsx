import React from "react";
import "./CSS/LearnAbout.css";
import { Footer } from "../Components/Footer/Footer";

export const LearnAbout = () => {
  const data = [
    {
      title: "Phishing",
      description:
        "Phishing involves tricking individuals into providing sensitive information such as usernames, passwords, credit card numbers, or other personal data by posing as a legitimate entity through emails, messages, or websites.",
    },
    {
      title: "Insider Threats",
      description:
        "Insider threats occur when individuals with authorized access to an organization's systems or information misuse their privileges for malicious purposes, such as stealing data, sabotaging operations, or committing fraud.",
    },
    {
      title: "Social Engineering",
      description:
        "Social engineering involves manipulating people into divulging confidential information or performing actions that compromise security, often through techniques such as pretexting, baiting, phishing, or impersonation.",
    },
    {
      title: "Cyber Espionage",
      description:
        "Cyber espionage, also known as cyber spying or cyber intelligence gathering, involves unauthorized access to sensitive information or intellectual property for espionage purposes, typically conducted by nation-states, intelligence agencies, or corporate competitors.",
    },
    {
      title: "Eavesdropping / Sniffing",
      description:
        "Eavesdropping or sniffing involves intercepting and monitoring network communications to capture sensitive information, such as passwords, financial details, or personal conversations, transmitted over unsecured or poorly encrypted connections.",
    },
    {
      title: "Supply Chain Attacks",
      description:
        "Supply chain attacks involve targeting vulnerabilities in third-party vendors, suppliers, or partners to infiltrate the networks or systems of larger organizations, allowing attackers to gain unauthorized access or conduct espionage activities.",
    },
    {
      title: "Denial-of-Service (DoS) Attacks",
      description:
        "DoS attacks disrupt the availability of online services by flooding servers, networks, or websites with excessive traffic, causing them to become slow, unresponsive, or entirely inaccessible to legitimate users.",
    },
    {
      title: "Man-in-the-Middle (MitM) Attacks",
      description:
        "MitM attacks occur when a cybercriminal intercepts and potentially alters communication between two parties without their knowledge, allowing them to eavesdrop on sensitive information or manipulate data exchanges.",
    },
    {
      title: "SIM Swapping",
      description:
        "SIM swapping, also known as SIM hijacking, involves fraudulently transferring a victim's phone number to a SIM card controlled by the attacker. This allows the attacker to receive the victim's calls, messages, and authentication codes, potentially gaining access to sensitive accounts.",
    },
    {
      title: "AI-Powered Cyber Attacks",
      description:
        "With the advancement of artificial intelligence (AI) and machine learning (ML) technologies, cybercriminals can develop sophisticated attacks that leverage AI algorithms to automate tasks, evade detection, and adapt to security defenses.",
    },
  ];

  return (
    <main className="learn-about-page">
      {/* Hero */}
      <section className="learn-about-hero">
        <span className="learn-about-eyebrow">CYBER SAFETY KNOWLEDGE</span>

        <h1>
          Learn About <span>Cybercrime</span>
        </h1>

        <p className="learn-about-hero-description">
          Understand common cyber threats, recognize suspicious activity, and
          learn how digital crimes affect individuals and organizations.
        </p>

        <div className="learn-about-tags">
          <span>Threat Awareness</span>
          <span>Online Safety</span>
          <span>Digital Protection</span>
        </div>
      </section>

      {/* Main content */}
      <section className="learn-about-content">
        <div className="learn-about-intro">
          <div className="learn-about-section-label">
            <span className="learn-about-label-line" />
            UNDERSTANDING CYBERCRIME
          </div>

          <h2>
            Know the threats.
            <span> Stay protected.</span>
          </h2>

          <p>
            In general, cybercrime may be defined as any unlawful act where a
            computer, communication device, or computer network is used to
            commit or facilitate the commission of a crime.
          </p>

          <p>
            Below is a list of common cybercrimes with brief explanations.
            Understanding these threats can help you recognize suspicious
            activity and make informed decisions when reporting incidents.
          </p>
        </div>

        {/* Cybercrime list */}
        <div className="learn-about-list-heading">
          <div>
            <span>CYBER THREAT DIRECTORY</span>
            <h2>Common Types of Cybercrime</h2>
          </div>

          <span className="learn-about-count">
            {String(data.length).padStart(2, "0")} THREATS
          </span>
        </div>

        <div className="learn-about-table-wrapper">
          <table className="learn-about-table">
            <thead>
              <tr>
                <th scope="col" className="learn-about-number-heading">
                  No.
                </th>
                <th scope="col">Cybercrime</th>
                <th scope="col">Description</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.title}>
                  <td className="learn-about-number">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="learn-about-crime-title">
                    <span className="learn-about-row-marker" />
                    {item.title}
                  </td>

                  <td className="learn-about-description">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Safety reminder */}
        <div className="learn-about-reminder">
          <div className="learn-about-reminder-icon" aria-hidden="true">
            !
          </div>

          <div>
            <h3>Stay alert. Think before you click.</h3>
            <p>
              Never share passwords, PINs, or one-time passwords with anyone.
              Verify suspicious links and requests before taking action, and use
              official reporting channels if you suspect cybercrime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default LearnAbout;
