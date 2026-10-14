import React, { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import { Link } from "react-router-dom";
import api from "../api";
import "./CSS/Feedback.css";

export const Feedback = () => {
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const addFeedback = async (feedback) => {
    setNotice(""); setError("");
    try { await api.post("/api/feedbacks", feedback); setNotice("Thank you. Your feedback was submitted successfully."); return true; }
    catch (requestError) { setError(requestError.response?.data?.error || "Unable to submit feedback right now."); return false; }
  };
  return <main className="feedback-page"><section className="feedback-heading"><span className="section-kicker">HELP US IMPROVE</span><h1>Your feedback matters.</h1><p>Share your experience so we can make this service clearer, safer and more useful.</p></section><div className="feedback-form-panel">{notice && <div className="notice notice-success" role="status">{notice}</div>}{error && <div className="notice notice-error" role="alert">{error}</div>}<FeedbackForm addFeedback={addFeedback} /></div><footer className="feedback-footer"><Link to="/Disclaimer">Disclaimer</Link><Link to="/FAQ">FAQ</Link><Link to="/Website Policies">Website policies</Link></footer></main>;
};
export default Feedback;
