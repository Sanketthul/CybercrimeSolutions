import React, { useState, useEffect } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import facebook from "../Components/Assets/facebook-app-symbol.png";
import instagram from "../Components/Assets/instagram.png";
import Twitter from "../Components/Assets/twitter.png";
import youtube from "../Components/Assets/youtube.png";
import { Link } from "react-router-dom";

export const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/feedbacks");
        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data);
        } else {
          console.error("Failed to fetch feedbacks");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const addFeedback = async (feedback) => {
    try {
      const response = await fetch("http://localhost:4000/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });
      if (response.ok) {
        console.log("Feedback submitted successfully");
        alert("feedback submit successfully");
        setFeedbacks([...feedbacks, feedback]);
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="list">
      <div className="App">
        <FeedbackForm addFeedback={addFeedback} />
        <FeedbackList feedbacks={feedbacks} />
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

export default Feedback;
