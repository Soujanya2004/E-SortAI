"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        backgroundColor: "#121212", // Dark background for the navbar
        color: "white",
        padding: "1rem 2rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Slightly stronger shadow
        borderBottom: "2px solid #333", // Subtle bottom border for extra definition
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4ade80" }}>Eco Report</h1>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/game">
            <span
              style={{
                cursor: "pointer",
                color: pathname === "/game" ? "#4ade80" : "white",
                fontWeight: pathname === "/game" ? "bold" : "normal", // Make active link bolder
                transition: "color 0.3s ease, font-weight 0.3s ease",
              }}
            >
              Game
            </span>
          </Link>
          <Link href="/repair">
            <span
              style={{
                cursor: "pointer",
                color: pathname === "/game" ? "#4ade80" : "white",
                fontWeight: pathname === "/game" ? "bold" : "normal", // Make active link bolder
                transition: "color 0.3s ease, font-weight 0.3s ease",
              }}
            >
              Repair
            </span>
          </Link>
          <Link href="/collect">
            <span
              style={{
                cursor: "pointer",
                color: pathname === "/game" ? "#4ade80" : "white",
                fontWeight: pathname === "/game" ? "bold" : "normal", // Make active link bolder
                transition: "color 0.3s ease, font-weight 0.3s ease",
              }}
            >
              Collect
            </span>
          </Link>
          <Link href="/">
            <span
              style={{
                cursor: "pointer",
                color: pathname === "/" ? "#4ade80" : "white",
                fontWeight: pathname === "/" ? "bold" : "normal", // Make active link bolder
                transition: "color 0.3s ease, font-weight 0.3s ease",
              }}
            >
              Home
            </span>
          </Link>
          <Link href="/scan">
            <span
              style={{
                cursor: "pointer",
                color: pathname === "/scan" ? "#4ade80" : "white",
                fontWeight: pathname === "/scan" ? "bold" : "normal", // Make active link bolder
                transition: "color 0.3s ease, font-weight 0.3s ease",
              }}
            >
              Scan
            </span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
