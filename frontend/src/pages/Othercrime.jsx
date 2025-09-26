import React, { useState, useEffect } from "react";
import "./CSS/Othercrime.css";
import facebook from "../Components/Assets/facebook-app-symbol.png";
import instagram from "../Components/Assets/instagram.png";
import Twitter from "../Components/Assets/twitter.png";
import youtube from "../Components/Assets/youtube.png";
import { Link } from "react-router-dom";
import OthercrimeForm from "./OthercrimeForm";
import OthercrimeList from "./OthercrimeList";

export const Othercrime = () => {
  const [crimeReports, setCrimeReports] = useState([]);

  // Fetch the crime reports when the component mounts
  useEffect(() => {
    const fetchCrimeReports = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/othercrime");
        if (response.ok) {
          const data = await response.json();
          setCrimeReports(data);
        } else {
          console.error("Failed to fetch crime reports");
        }
      } catch (error) {
        console.error("Error fetching crime reports:", error);
      }
    };

    fetchCrimeReports();
  }, []); // Empty dependency array means this runs once after the initial render

  const addCrimeReport = (report) => {
    setCrimeReports([...crimeReports, report]);
  };

  return (
    <div className="othercrime">
      <div className="otherCrime">
        <h1>Report Other Crime</h1>
        <p>
          "You can share your experience with us regarding crimes not listed on
          our website. We'll provide suitable solutions."
        </p>
        <OthercrimeForm addCrimeReport={addCrimeReport} />
        <OthercrimeList crimeReports={crimeReports} />
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
            Copyright @ 2025 - All Rights Reserved. Designed by Cyber Crime
            Solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Othercrime;
