import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/Cybercrime_Solutions_Neon_Logo-removebg-preview.png";
import user from "../Assets/user .png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../../api";

export const Navbar = () => {
  const [userData, setUserData] = useState(() => {
    const savedUser = sessionStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      const loggedIn = sessionStorage.getItem("loggedIn");

      if (!token || loggedIn !== "true") {
        if (active) {
          setUserData(null);
          sessionStorage.removeItem("userData");
        }
        return;
      }

      try {
        // Correct endpoint from your backend.
        const response = await api.get("/userData");
        const result = response.data?.data;

        if (!active) return;

        if (result) {
          setUserData(result);
          sessionStorage.setItem("userData", JSON.stringify(result));
        }
      } catch (error) {
        // Keep the saved profile and session if this request fails.
        console.error(
          "Could not refresh navbar profile:",
          error.response?.status || error.message,
        );
      }
    };

    fetchUser();

    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      active = false;
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  // Close popup when clicking outside or pressing Escape.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const getUserName = () => {
    if (!userData) return "";

    const name = [userData.fname, userData.lname]
      .filter(Boolean)
      .join(" ")
      .trim();

    return (
      name ||
      userData.name ||
      userData.username ||
      userData.email?.split("@")[0] ||
      "My Account"
    );
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userType");

    setUserData(null);
    setProfileOpen(false);

    window.dispatchEvent(new Event("auth-change"));
    navigate("/sign-in", { replace: true });
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
        onClick={() => {
          setMobileMenu((prev) => !prev);
          setProfileOpen(false);
        }}
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
        {userData && sessionStorage.getItem("token") ? (
          <div className="nav-profile-wrapper" ref={profileRef}>
            <button
              type="button"
              className={`nav-user-button ${
                profileOpen ? "nav-user-button-open" : ""
              }`}
              aria-expanded={profileOpen}
              aria-haspopup="true"
              aria-label="Open account menu"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setMobileMenu(false);
              }}
            >
              <span className="nav-user-avatar">
                {getUserName().charAt(0).toUpperCase()}
              </span>

              <span className="nav-user-name">{getUserName()}</span>

              <span className="nav-user-arrow">{profileOpen ? "⌃" : "⌄"}</span>
            </button>

            {profileOpen && (
              <div className="nav-profile-dropdown">
                <div className="nav-profile-header">
                  <div className="nav-profile-large-avatar">
                    {getUserName().charAt(0).toUpperCase()}
                  </div>

                  <div className="nav-profile-heading">
                    <strong>{getUserName()}</strong>
                    <span>{userData.email || "Email not available"}</span>
                  </div>
                </div>

                <div className="nav-profile-divider" />

                <div className="nav-profile-details">
                  <div className="nav-profile-detail-row">
                    <span className="nav-profile-detail-label">
                      Account type
                    </span>
                    <span className="nav-profile-detail-value">
                      {userData.userType || "User"}
                    </span>
                  </div>

                  {userData.phone && (
                    <div className="nav-profile-detail-row">
                      <span className="nav-profile-detail-label">Phone</span>
                      <span className="nav-profile-detail-value">
                        {userData.phone}
                      </span>
                    </div>
                  )}
                </div>

                <div className="nav-profile-divider" />

                <button
                  type="button"
                  className="nav-profile-dashboard"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/userDetails");
                  }}
                >
                  <span>▦</span>
                  My Dashboard
                  <span className="nav-profile-action-arrow">→</span>
                </button>

                <button
                  type="button"
                  className="nav-profile-logout"
                  onClick={handleLogout}
                >
                  <span>↪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
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
