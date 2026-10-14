import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import UserHome from "./userHome";
import AdminHome from "./adminHome";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    if (!window.localStorage.getItem("token")) { navigate("/sign-in", { replace: true }); return undefined; }
    api.get("/userData").then((response) => { if (active) setUserData(response.data.data); })
      .catch((requestError) => { if (active) { setError(requestError.response?.data?.error || "Could not load your profile."); window.localStorage.removeItem("token"); window.localStorage.removeItem("loggedIn"); navigate("/sign-in", { replace: true, state: { notice: "Please sign in again." } }); } });
    return () => { active = false; };
  }, [navigate]);
  if (error) return <div role="alert">{error}</div>;
  if (!userData) return <main className="profile-loading">Loading your secure workspace…</main>;
  return userData.userType === "Admin" ? <AdminHome userData={userData} /> : <UserHome userData={userData} />;
}
