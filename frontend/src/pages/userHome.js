import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/user.css";
export default function UserHome({ userData }) {
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userType");

    window.dispatchEvent(new Event("auth-change"));
    navigate("/sign-in", { replace: true });
  };
  return (
    <main className="user-dashboard">
      <section className="user-welcome">
        <span className="section-kicker">YOUR SECURE WORKSPACE</span>
        <h1>Welcome back, {userData.fname}.</h1>
        <p>Manage your account and keep track of your cyber safety journey.</p>
      </section>
      <section className="user-profile-card">
        <div className="user-profile-icon">
          {(userData.fname || "U").slice(0, 1).toUpperCase()}
        </div>
        <div className="user-profile-copy">
          <span>ACCOUNT PROFILE</span>
          <h2>
            {userData.fname} {userData.lname}
          </h2>
          <p>{userData.email}</p>
          <small>Standard user account</small>
        </div>
        <button onClick={logOut}>Sign out ↗</button>
      </section>
      <section className="user-action-grid">
        <article>
          <span className="user-action-icon">▤</span>
          <h3>Report an incident</h3>
          <p>Submit a cybercrime report and receive a private tracking ID.</p>
          <Link to="/Othercrime">Create a report →</Link>
        </article>
        <article>
          <span className="user-action-icon teal">◷</span>
          <h3>Track a report</h3>
          <p>
            Use your tracking ID and email address to see the latest status.
          </p>
          <Link to="/Othercrime">Track case progress →</Link>
        </article>
        <article>
          <span className="user-action-icon violet">◇</span>
          <h3>Learn and stay safe</h3>
          <p>Explore practical guidance to help protect your digital life.</p>
          <Link to="/Learn About Cyber Crime">Explore safety resources →</Link>
        </article>
      </section>
    </main>
  );
}
