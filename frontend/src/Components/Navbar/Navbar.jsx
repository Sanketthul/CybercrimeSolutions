import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/color logo 5.png";
import user from "../Assets/user .png";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("Home");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          {menu === "Home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Contactus");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/Contactus">
            Contact us
          </Link>
          {menu === "Contactus" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Awareness");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/Awareness">
            Awareness
          </Link>
          {menu === "Awareness" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("My reports");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/my-reports">
            My reports
          </Link>
          {menu === "My reports" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Feedback");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/Feedback">
            Feedback
          </Link>
          {menu === "Feedback" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Aboutus");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/Aboutus">
            About us
          </Link>
          {menu === "Aboutus" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Othercrime");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/Othercrime">
            Other Crime
          </Link>
          {menu === "Othercrime" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>
            {" "}
            <img src={user} alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
};
