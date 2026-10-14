import React from "react";
import "./Cbot.css";
import img1 from "../Assets/Arrow.png";
export const Cbot = () => {
  return (
    <section id="Cbot">
      <h2 className="Chat">ChatBot</h2>
      <span className="Bot">
        Welcome to our cybercrime solution platform, where we empower users with
        innovative tools to combat online threats effectively. Our intelligent
        chatbot serves as your virtual assistant, guiding you through essential
        cybersecurity measures and providing real-time support to address your
        concerns. Whether you're a business owner, a concerned parent, or an
        individual navigating the digital landscape, our chatbot is here to
        help.
      </span>
      <div className="Bot1">
        <img src={img1} alt="" className="Bot1 img" />
        <p>Click on the Blue Icon</p>
      </div>
    </section>
  );
};
