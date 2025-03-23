// src/app/game/page.jsx
"use client"; // Mark as a Client Component

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import GameArea from "../../components/GameArea";
import Items from "../../components/Items";
import HistorySection from "../../components/HistorySection";
import Popup from "../../components/Popup";

export default function GamePage() {
  const [scoreHistory, setScoreHistory] = useState([]);

  // Function to update score history
  const updateScoreHistory = (newScore) => {
    setScoreHistory((prevHistory) => [...prevHistory, newScore]);
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const sectionStyle = {
    marginBottom: "32px",
    width: "100%",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundImage: "url('https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-thelily-washpost.s3.amazonaws.com/public/SGOVWGXKJNEE3M6DEJF6RAQ6LQ.gif&w=1200')", // Add the background GIF
        backgroundSize: "cover", // Ensure the background image covers the full screen
        backgroundPosition: "center", // Center the background image
        minHeight: "100vh", // Make sure the background covers the entire viewport
      }}
    >
      <div style={containerStyle}>
        {/* Heading added here */}
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "black", marginBottom: "20px" ,padding:"10px", backgroundColor:"whitesmoke"}}>
          Drag and Drop the E-wastes into the Right Bins
        </h1>

        <div style={sectionStyle}>
          <GameArea updateScoreHistory={updateScoreHistory} />
        </div>
        <div style={sectionStyle}>
          {/* You can add other components here if needed */}
        </div>
        <div style={sectionStyle}>
          {/* <HistorySection scoreHistory={scoreHistory} /> */}
        </div>
        <div style={sectionStyle}>
          {/* You can add other components here if needed */}
        </div>
      </div>
    </div>
  );
}
