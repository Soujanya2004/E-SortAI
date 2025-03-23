"use client";
import React from "react";
import Navbar from "../components/Navbar"; // Assuming Navbar is in the components folder
import Link from "next/link";

function WelcomePage() {
  return (
    <div>
      {/* Navbar at the top of the page */}
      <Navbar />
      
      <div
        style={{
          backgroundColor: "#121212", // Dark background for consistency
          color: "white",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#4ade80" }}>
          Welcome to Eco Report!
        </h1>
        <p style={{ fontSize: "1.5rem", margin: "1rem 0" }}>
          We help you track and understand your ecological footprint.
        </p>
        <Link
          href="/"
          style={{
            fontSize: "1.25rem",
            textDecoration: "none",
            color: "#4ade80",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
