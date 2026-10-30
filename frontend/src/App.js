import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import AdminNavbar from "./Components/Navbar/AdminNavbar";
import api from "./api";

import { Home } from "./pages/Home";
import { Cybercrime } from "./pages/Cybercrime";
import { LearnAbout } from "./pages/LearnAbout";
import { Cybera } from "./pages/Cybera";
import { Cyber } from "./pages/Cyber";
import { Secure } from "./pages/Secure";
import { Aboutus } from "./pages/Aboutus";
import { Feedback } from "./pages/Feedback";
import { Contantus } from "./pages/Contantus";
import AdminFeedback from "./pages/AdminFeedback";
import { Disclaimer } from "./Components/footerpoint/Disclaimer";
import { FAQ } from "./Components/footerpoint/FAQ";
import { WebsitePolicies } from "./Components/footerpoint/WebsitePolicies";
import UserDetails from "./pages/userDetails";
import Login from "./pages/login_components";
import Signup from "./pages/signup_components";
import { Othercrime } from "./pages/Othercrime";
import ThreatAwareness from "./pages/ThreatAwareness";
import MyReports from "./pages/MyReports";

function AppLayout() {
  const [userType, setUserType] = useState(
    () => sessionStorage.getItem("userType") || "",
  );
  const [checkingRole, setCheckingRole] = useState(
    () =>
      Boolean(sessionStorage.getItem("token")) &&
      !sessionStorage.getItem("userType"),
  );

  useEffect(() => {
    let active = true;

    const loadRole = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        if (active) {
          setUserType("");
          setCheckingRole(false);
          sessionStorage.removeItem("userType");
        }
        return;
      }

      // Reuse a role already confirmed during this session.
      const savedRole = sessionStorage.getItem("userType");

      if (savedRole === "Admin" || savedRole === "User") {
        if (active) {
          setUserType(savedRole);
          setCheckingRole(false);
        }
        return;
      }

      if (active) setCheckingRole(true);

      try {
        const response = await api.get("/userData");
        const user = response.data?.data;

        if (!active) return;

        if (user?.userType === "Admin" || user?.userType === "User") {
          sessionStorage.setItem("userType", user.userType);
          setUserType(user.userType);
        } else {
          setUserType("");
        }
      } catch (error) {
        // Do not clear the token because a secondary request failed.
        // UserDetails remains responsible for handling an invalid session.
        if (active) setUserType("");
      } finally {
        if (active) setCheckingRole(false);
      }
    };

    loadRole();

    const handleAuthChange = () => {
      sessionStorage.removeItem("userType");
      loadRole();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      active = false;
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  return (
    <>
      {checkingRole ? null : userType === "Admin" ? (
        <AdminNavbar />
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Awareness" element={<ThreatAwareness />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/Othercrime" element={<Othercrime />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/Contactus" element={<Contantus />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/Cybercrime" element={<Cybercrime />} />
        <Route path="/Cybercrime/:CybercrimeId" element={<Cybercrime />} />

        <Route path="/Learn About Cyber Crime" element={<LearnAbout />} />
        <Route path="/Secure Online Transactions" element={<Cyber />} />
        <Route path="/Cyber Awareness" element={<Secure />} />
        <Route path="/Cyber Safety Tips" element={<Cybera />} />

        <Route path="/Disclaimer" element={<Disclaimer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/userDetails" element={<UserDetails />} />

        <Route path="/Website Policies" element={<WebsitePolicies />} />
        <Route path="/FAQ" element={<FAQ />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
