import React, { useEffect, useState } from "react";
import api from "../api";
import "./CSS/Feedback.css";

function FeedbackForm({ addFeedback }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [profileLoading, setProfileLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const getProfile = async () => {
      try {
        // Load the cached profile first, if available.
        let cachedUser = null;

        try {
          cachedUser = JSON.parse(sessionStorage.getItem("userData") || "null");
        } catch {
          cachedUser = null;
        }

        const getName = (user) => {
          if (!user) return "";

          const fullName = [user.fname, user.lname]
            .filter(Boolean)
            .join(" ")
            .trim();

          return (
            fullName ||
            user.name ||
            user.username ||
            user.email?.split("@")[0] ||
            ""
          );
        };

        const applyProfile = (user) => {
          if (!active || !user) return;

          setForm((previous) => ({
            ...previous,
            name: getName(user),
            email: user.email || "",
          }));
        };

        if (cachedUser) {
          applyProfile(cachedUser);
        }

        // Refresh profile data from the backend when logged in.
        const token = sessionStorage.getItem("token");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (token && loggedIn === "true") {
          const response = await api.get("/userData");
          const profile = response.data?.data;

          if (profile) {
            // Keep cached values when the API omits a profile field.
            const mergedProfile = {
              ...cachedUser,
              ...profile,
              fname: profile.fname || cachedUser?.fname,
              lname: profile.lname || cachedUser?.lname,
              name: getName(profile) || getName(cachedUser),
              email: profile.email || cachedUser?.email || "",
            };

            applyProfile(mergedProfile);

            sessionStorage.setItem("userData", JSON.stringify(mergedProfile));
          }
        }

        if (active) {
          setProfileLoading(false);
        }
      } catch (requestError) {
        console.error("Unable to load user profile:", requestError);

        if (active) {
          setError(
            "Unable to load your profile. Please refresh the page and try again.",
          );
          setProfileLoading(false);
        }
      }
    };

    getProfile();

    return () => {
      active = false;
    };
  }, []);

  const update = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (profileLoading) {
      setError("Please wait while your profile loads.");
      return;
    }

    if (!form.name.trim() || !form.email.trim()) {
      setError(
        "Your name and email could not be loaded. Please sign in again.",
      );
      return;
    }

    setBusy(true);

    try {
      const success = await addFeedback({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
      });

      if (success) {
        setForm((previous) => ({
          ...previous,
          subject: "",
          message: "",
        }));
      } else {
        setError("Please check your details and try again.");
      }
    } catch (requestError) {
      console.error("Feedback submission failed:", requestError);
      setError("Unable to submit feedback. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container">
      <h2>Send feedback</h2>

      <form onSubmit={handleSubmit} className="container2">
        <label>
          Name
          <input
            name="name"
            type="text"
            value={form.name}
            maxLength="100"
            readOnly
            required
            placeholder={profileLoading ? "Loading your name..." : "Your name"}
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            maxLength="254"
            readOnly
            required
            placeholder={
              profileLoading ? "Loading your email..." : "you@example.com"
            }
          />
        </label>

        <label>
          Subject
          <input
            name="subject"
            type="text"
            value={form.subject}
            onChange={update}
            maxLength="160"
            required
            placeholder="What is this about?"
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={update}
            maxLength="5000"
            required
            rows="5"
            placeholder="Tell us what we can improve..."
          />
        </label>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={busy || profileLoading}>
          {profileLoading
            ? "Loading profile..."
            : busy
              ? "Submitting..."
              : "Submit feedback"}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
