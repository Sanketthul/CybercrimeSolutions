import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import logo from "../Assets/Cybercrime_Solutions_Neon_Logo-removebg-preview.png";
import api from "../../api";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState(() => {
    const savedAdmin = sessionStorage.getItem("userData");

    try {
      return savedAdmin ? JSON.parse(savedAdmin) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let active = true;

    const fetchAdmin = async () => {
      const token = sessionStorage.getItem("token");
      const loggedIn = sessionStorage.getItem("loggedIn");

      if (!token || loggedIn !== "true") {
        if (active) {
          setAdminData(null);
          sessionStorage.removeItem("userData");
        }
        return;
      }

      try {
        const response = await api.get("/userData");
        const result = response.data?.data;

        if (!active) return;

        if (result) {
          setAdminData(result);
          sessionStorage.setItem("userData", JSON.stringify(result));
        }
      } catch (error) {
        console.error(
          "Could not refresh admin profile:",
          error.response?.status || error.message,
        );
      }
    };

    fetchAdmin();

    const handleAuthChange = () => {
      fetchAdmin();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      active = false;
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const getAdminName = () => {
    if (!adminData) return "Admin";

    const fullName = [adminData.fname, adminData.lname]
      .filter(Boolean)
      .join(" ")
      .trim();

    return (
      fullName ||
      adminData.name ||
      adminData.username ||
      adminData.email?.split("@")[0] ||
      "Admin"
    );
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userType");

    setAdminData(null);

    window.dispatchEvent(new Event("auth-change"));
    navigate("/sign-in", { replace: true });
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/userDetails" },
    { label: "Awareness", path: "/Awareness" },
    { label: "About Us", path: "/Aboutus" },
  ];

  return (
    <header className="admin-navbar">
      <NavLink
        to="/userDetails"
        className="admin-navbar-brand"
        aria-label="Admin dashboard"
      >
        <img src={logo} alt="Cybercrime Solutions" />
        <span className="admin-navbar-brand-text">
          <strong>CYBERCRIME</strong>
          <span>SOLUTIONS</span>
        </span>
      </NavLink>

      <nav className="admin-navbar-links" aria-label="Admin navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `admin-navbar-link ${isActive ? "admin-navbar-link-active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="admin-navbar-actions">
        {adminData && sessionStorage.getItem("token") && (
          <div className="admin-navbar-user">
            <span className="admin-navbar-avatar" aria-hidden="true">
              {getAdminName().charAt(0).toUpperCase()}
            </span>
            <span className="admin-navbar-user-name" title={getAdminName()}>
              {getAdminName()}
            </span>
          </div>
        )}

        <button
          type="button"
          className="admin-navbar-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
