// src/components/Items.js
"use client"; // Mark as a Client Component

import React from "react";

const Items = () => {
  const items = [
    { src: "/battery.jpg", alt: "Battery", type: "non-recyclable" },
    { src: "/monitor.jpg", alt: "Monitor", type: "recyclable" },
    { src: "/circuit-board.jpg", alt: "Circuit Board", type: "recyclable" },
    { src: "/laptop.jpg", alt: "Laptop", type: "recyclable" },
    { src: "/light-bulb.jpg", alt: "Light Bulb", type: "non-recyclable" },
    { src: "/headphone.jpg", alt: "Headphone", type: "non-recyclable" },
    { src: "/keboard.jpg", alt: "Keyboard", type: "non-recyclable" },
  ];

  // Inline styles
  const itemsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  };

  const itemStyle = {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    cursor: "grab",
    borderRadius: "8px",
    border: "2px solid #ddd",
    transition: "transform 0.3s ease",
  };

  // Handle drag start event
  const handleDragStart = (e, itemType) => {
    e.dataTransfer.setData("type", itemType);
  };

  return (
    <div style={itemsContainerStyle}>
      {items.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt={item.alt}
          style={itemStyle}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item.type)}
        />
      ))}
    </div>
  );
};

export default Items;
