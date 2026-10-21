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

    const loadUser = async () => {
      const token = window.sessionStorage.getItem("token");

      if (!token) {
        navigate("/sign-in", { replace: true });
        return;
      }

      try {
        const response = await api.get("/userData");

        if (active) {
          setUserData(response.data.data);
        }
      } catch (requestError) {
        if (!active) return;

        if (requestError.response?.status === 401) {
          window.sessionStorage.removeItem("token");
          window.sessionStorage.removeItem("loggedIn");

          navigate("/sign-in", {
            replace: true,
            state: { notice: "Your session expired. Please sign in again." },
          });
          return;
        }

        setError(
          requestError.response?.data?.error ||
            "Could not load your profile. Please try again.",
        );
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, [navigate]);

  if (error) {
    return (
      <main className="profile-loading" role="alert">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </main>
    );
  }

  if (!userData) {
    return (
      <main className="profile-loading">Loading your secure workspace…</main>
    );
  }

  return userData.userType === "Admin" ? (
    <AdminHome userData={userData} />
  ) : (
    <UserHome userData={userData} />
  );
}
