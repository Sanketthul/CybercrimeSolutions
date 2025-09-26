import React, { useState } from "react";
import "./CSS/Othercrime.css";

function OthercrimeForm({ addCrimeReport }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend
      const response = await fetch("http://localhost:4000/api/othercrime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        console.log("Crime report submitted successfully");
        alert("Other Crime report submitted successfully.");
        // Optionally, you could update the frontend's state to reflect the new crime report
        addCrimeReport({ name, email, message });
      } else {
        console.error("Failed to submit crime report");
        alert("Failed to submit crime report.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting crime report.");
    }

    // Clear form after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container">
      <h2>Report Other Crime</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the Crime"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OthercrimeForm;
