import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/Cybercrime_Solutions_Neon_Logo-removebg-preview.png";
import user from "../Assets/user .png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../../api";

export const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      const loggedIn = sessionStorage.getItem("loggedIn");

      if (!token || loggedIn !== "true") {
        if (active) setUserData(null);
        return;
      }

      try {
        const response = await api.get("/api/user-details");

        if (!active) return;

        const result =
          response.data?.data ?? response.data?.user ?? response.data;

        setUserData(result);
      } catch (error) {
        if (active) setUserData(null);

        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("loggedIn");
        }
      }
    };

    fetchUser();

    // Refresh when login/logout happens in this tab.
    const handleAuthChange = () => fetchUser();
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      active = false;
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const getUserName = () => {
    if (!userData) return "";

    const fullName = [userData.fname, userData.lname]
      .filter(Boolean)
      .join(" ")
      .trim();

    return (
      fullName ||
      userData.name ||
      userData.username ||
      userData.email?.split("@")[0] ||
      "My Account"
    );
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Contact us", path: "/Contactus" },
    { label: "Awareness", path: "/Awareness" },
    { label: "My reports", path: "/my-reports" },
    { label: "Feedback", path: "/Feedback" },
    { label: "About us", path: "/Aboutus" },
    { label: "Other Crime", path: "/Othercrime" },
  ];

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo" aria-label="Cybercrime Solutions home">
        <img src={logo} alt="Cybercrime Solutions" />
      </Link>

      <button
        className="nav-mobile-toggle"
        type="button"
        aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileMenu}
        onClick={() => setMobileMenu((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-menu ${mobileMenu ? "nav-menu-open" : ""}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "nav-item-active" : ""}`
            }
            onClick={() => setMobileMenu(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-login-cart">
        {userData ? (
          <button
            type="button"
            className="nav-user-button"
            onClick={() => {
              setMobileMenu(false);
              navigate("/userDetails");
            }}
            title="View your profile"
          >
            <span className="nav-user-avatar">
              {getUserName().charAt(0).toUpperCase()}
            </span>

            <span className="nav-user-name">{getUserName()}</span>

            <span className="nav-user-arrow">⌄</span>
          </button>
        ) : (
          <Link to="/login" className="nav-login-link">
            <img src={user} alt="" />
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
};
