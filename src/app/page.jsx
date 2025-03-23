"use client";
import React, { useState, useCallback } from "react";
import Navbar from "./Navbar";
import { useHandleStreamResponse } from "../utilities/runtime-helpers";

function MainComponent() {
  const [device, setDevice] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [error, setError] = useState(null); // Add error state

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: (message) => setAnalysis(message),
  });

  const generateQRCode = useCallback(async (data) => {
    try {
      const response = await fetch(
        `/integrations/qr-code/generatebasicbase64?data=${encodeURIComponent(
          JSON.stringify(data)
        )}`
      );
      if (!response.ok) throw new Error("Failed to generate QR code");
      const base64 = await response.text();
      setQrCode(base64);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const generatePDF = useCallback(async () => {
    try {
      const htmlContent = `
        <div style="padding: 20px; font-family: Arial;">
          <h1>Eco-Score Report for ${device}</h1>
          <h2>Score: ${result.score}%</h2>
          <h3>Badge: ${result.badge}</h3>
          <p>${analysis}</p>
        </div>
      `;

      const response = await fetch("/integrations/pdf-generation/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: { html: htmlContent },
        }),
      });

      if (!response.ok) throw new Error("Failed to generate PDF");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "eco-score-report.pdf";
      a.click();
    } catch (err) {
      setError(err.message);
    }
  }, [device, result, analysis]);

  const calculateScore = useCallback(async () => {
    setError(null); // Clear previous errors
    setScanning(true);
    try {
      const devices = {
        iphone: { score: 85, badge: "Green Gadget Guru", color: "green" },
        samsung: { score: 75, badge: "Eco Warrior", color: "green" },
        pixel: { score: 70, badge: "Planet Protector", color: "yellow" },
        huawei: { score: 65, badge: "Earth Enthusiast", color: "yellow" },
        oneplus: { score: 60, badge: "E-Waste Villain", color: "red" },
      };

      const defaultResult = { score: 50, badge: "Mystery Maven", color: "red" };
      const deviceLower = device.toLowerCase();
      const match = Object.keys(devices).find((key) => deviceLower.includes(key));
      const scoreResult = match ? devices[match] : defaultResult;
      setResult(scoreResult);

      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Analyze the environmental impact of ${device}. Include: 1) Manufacturing impact 2) Energy efficiency 3) Recyclability 4) Suggestions for sustainable use. Keep it concise and friendly.`,
            },
          ],
          stream: true,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch analysis");
      handleStreamResponse(response);
      generateQRCode(scoreResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  }, [device, generateQRCode]);

  return (
    <>
      
      <div
        className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] text-white p-6"
        style={{
          backgroundImage: 'url("https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-thelily-washpost.s3.amazonaws.com/public/SGOVWGXKJNEE3M6DEJF6RAQ6LQ.gif&w=1200")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 font-roboto">
              🔍🌿 Your Eco Scanner
            </h1>
            <p className="text-white-300 font-roboto">
              Discover your device's eco-footprint
            </p>
          </div>

          <div className="bg-[#333333] p-6 rounded-lg shadow-xl">
            <input
              type="text"
              name="device"
              placeholder="Enter your device model (e.g., iPhone 14, Samsung S23)"
              className="w-full p-3 rounded bg-[#444444] text-white placeholder-gray-400 mb-4 font-roboto"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
            />

            <button
              onClick={calculateScore}
              disabled={scanning || !device}
              className={`w-full p-3 rounded font-bold ${
                scanning || !device
                  ? "bg-gray-600"
                  : "bg-[#4CAF50] hover:bg-[#45a049]"
              } transition-colors font-roboto`}
            >
              {scanning ? "Scanning..." : "Analyze Device"}
            </button>
          </div>

          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-xl">
              Error: {error}
            </div>
          )}

          {result && (
            <div className="bg-[#333333] p-6 rounded-lg shadow-xl text-center animate-fade-in space-y-6">
              <div
                className={`text-6xl mb-4 ${
                  result.score >= 80
                    ? "text-green-500"
                    : result.score >= 70
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {result.score}%
              </div>
              <div className="text-2xl font-bold mb-2 font-roboto">
                {result.badge}
              </div>
              <div className="text-gray-300 font-roboto">
                {result.score >= 80
                  ? "🌱 Excellent eco-friendly choice!"
                  : result.score >= 70
                  ? "👍 Pretty good sustainability score"
                  : "🌍 Room for improvement"}
              </div>

              <div className="mt-4 p-4 bg-[#444444] rounded-lg">
                <h3 className="text-xl font-bold mb-2 font-roboto">
                  Detailed Analysis
                </h3>
                <p className="text-gray-300 whitespace-pre-wrap font-roboto">
                  {streamingMessage || analysis}
                </p>
              </div>

              {qrCode && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold mb-2 font-roboto">
                    Share Results
                  </h3>
                  <img
                    src={`data:image/png;base64,${qrCode}`}
                    alt="QR Code for results"
                    className="mx-auto w-32 h-32"
                  />
                </div>
              )}

              <button
                onClick={generatePDF}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors font-roboto"
              >
                📥 Download Report
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default MainComponent;