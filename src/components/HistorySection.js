// src/components/HistorySection.js
import React from "react";

const HistorySection = ({ scoreHistory = [] }) => {
  // Inline styles
  const historySectionStyle = {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
  };

  const scoreListStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  };

  const scoreItemStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
    fontSize: "18px",
  };

  return (
    <div style={historySectionStyle}>
      <h3 style={titleStyle}>Score History</h3>
      <ul style={scoreListStyle}>
        {scoreHistory.length > 0 ? (
          <li style={scoreItemStyle}>Final Score: {scoreHistory[scoreHistory.length - 1]}</li>
        ) : (
          <li style={scoreItemStyle}>No scores yet.</li>
        )}
      </ul>
    </div>
  );
};

export default HistorySection;
