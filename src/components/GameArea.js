"use client"; // Mark as a Client Component

import React, { useState, useEffect } from "react";
import Popup from "./Popup"; // Import the Popup component
import { FaRecycle, FaTrash } from "react-icons/fa"; // Icons for bins

const GameArea = ({ updateScoreHistory }) => {
  const initialItems = [
    { src: "/battery.jpg", alt: "Battery", type: "non-recyclable" },
    { src: "/monitor.jpg", alt: "Monitor", type: "recyclable" },
    { src: "/keboard.jpg", alt: "Keyboard", type: "non-recyclable" },
    { src: "/circuit-board.jpg", alt: "Circuit Board", type: "recyclable" },
    { src: "/laptop.jpg", alt: "Laptop", type: "recyclable" },
    { src: "/light-bulb.jpg", alt: "Light Bulb", type: "non-recyclable" },
    { src: "/headphone.jpg", alt: "Headphone", type: "non-recyclable" },
  ];

  const [items, setItems] = useState(initialItems);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [highlightBin, setHighlightBin] = useState(null); // Track bin highlights

  // Handle drag start event
  const handleDragStart = (e, itemType) => {
    e.dataTransfer.setData("type", itemType);
    setHighlightBin(itemType); // Highlight correct bin
  };

  // Handle drop event
  const handleDrop = (e, binType) => {
    e.preventDefault();
    const itemType = e.dataTransfer.getData("type");

    // Find the index of the first item that matches the dropped type
    const itemIndex = items.findIndex((item) => item.type === itemType);

    if (itemIndex !== -1) {
      const isCorrectDrop = items[itemIndex].type === binType;
      setScore((prevScore) => (isCorrectDrop ? prevScore + 5 : prevScore - 5));

      // Remove only the dragged item
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.splice(itemIndex, 1);
        return newItems;
      });
    }

    setHighlightBin(null); // Reset highlight after drop
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setHighlightBin(null);
  };

  // Check when all items are removed to update score history
  useEffect(() => {
    if (items.length === 0) {
      updateScoreHistory([score]);
      setGameCompleted(true);
    }
  }, [items.length, score, updateScoreHistory]);

  // Reset game for a new round
  const resetGame = () => {
    setItems(initialItems);
    setScore(0);
    setGameCompleted(false);
  };

  return (
    <div id="game-container">
      <style jsx>{`
        #game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        #bins-container {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 20px;
          width: 100%;
        }

        .bin {
          width: 180px;
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .recyclable {
          background-color: #a3d9a5;
          border: 3px solid #4caf50;
          color: #2e7d32;
        }

        .non-recyclable {
          background-color: #f9a3a3;
          border: 3px solid #e53935;
          color: #b71c1c;
        }

        .bin:hover {
          transform: scale(1.1);
        }

        /* Highlight bin when dragging */
        .correct-drop {
          background-color: #81c784 !important;
          border-color: #388e3c;
        }

        .wrong-drop {
          background-color: #e57373 !important;
          border-color: #c62828;
        }

        #score-display {
          font-size: 24px;
          font-weight: bold;
          margin-top: 10px;
        }

        #items-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .waste-item {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .waste-item:active {
          transform: scale(1.2);
        }
      `}</style>

      <div id="bins-container">
        <div
          className={`bin recyclable ${
            highlightBin === "recyclable"
              ? "correct-drop"
              : highlightBin && highlightBin !== "recyclable"
              ? "wrong-drop"
              : ""
          }`}
          onDrop={(e) => handleDrop(e, "recyclable")}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FaRecycle size={40} />
          Recyclable
        </div>

        <div
          className={`bin non-recyclable ${
            highlightBin === "non-recyclable"
              ? "correct-drop"
              : highlightBin && highlightBin !== "non-recyclable"
              ? "wrong-drop"
              : ""
          }`}
          onDrop={(e) => handleDrop(e, "non-recyclable")}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FaTrash size={40} />
          Non-Recyclable
        </div>
      </div>

      <div id="score-display">Score: {score}</div>

      <div id="items-container">
        {items.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            className="waste-item"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item.type)}
          />
        ))}
      </div>

      {gameCompleted && <Popup finalScore={score} onClose={resetGame} />}
    </div>
  );
};

export default GameArea;
