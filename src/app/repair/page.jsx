"use client";
import React, { useState } from "react"; // Add this import
import {
  useUpload,
  useHandleStreamResponse,
} from "../../utilities/runtime-help";

function MainComponent() {
  const [deviceInfo, setDeviceInfo] = useState({
    name: "",
    age: "",
    damageLevel: "minor",
  });
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [repairShops, setRepairShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [upload, { loading: uploadLoading }] = useUpload();
  const [error, setError] = useState(null);

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: (message) => {
      setAnalysis(message);
      setStreamingMessage("");
    },
  });

  const analyzeImage = async (imageUrl) => {
    const response = await fetch("/integrations/gpt-vision/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this item's condition and repairability. Focus on key damage points and whether it should be repaired or recycled.",
              },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { url, error } = await upload({ file });
      if (error) {
        setError(error);
        return;
      }
      setImage(url);
      const imageAnalysis = await analyzeImage(url);
      setAnalysis(imageAnalysis);
    }
  };

  const getRecommendation = async () => {
    setLoading(true);
    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Analyze this ${deviceInfo.name}:
Age: ${deviceInfo.age} years
Damage Level: ${deviceInfo.damageLevel}
${analysis ? `Image Analysis: ${analysis}` : ""}

Provide a clear, bulleted response with:
• Repair or Recycle recommendation
• Environmental impact summary
• Resources saved by chosen option
• Carbon footprint reduction estimate`,
          },
        ],
        stream: true,
      }),
    });
    handleStreamResponse(response);

    if (deviceInfo.name) {
      const locationResponse = await fetch(
        `/integrations/local-business-data/search?query=repair ${deviceInfo.name} shops&business_status=OPEN&limit=4`
      );
      const data = await locationResponse.json();
      setRepairShops(data.data || []);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[black] p-6">
     <div className="min-h-screen bg-[url('https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-thelily-washpost.s3.amazonaws.com/public/SGOVWGXKJNEE3M6DEJF6RAQ6LQ.gif&w=1200')] p-6">
        <h1 className="text-4xl font-crimson-text text-[#ffff] mb-20px text-center">
          🌱 Repair or Recycle Analyzer
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 bg-[#f0f4f8]">
          <div className="mb-6">
            <label className="block text-lg mb-2">Upload Item Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Item Name"
              value={deviceInfo.name}
              onChange={(e) =>
                setDeviceInfo({ ...deviceInfo, name: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Age (years)"
              value={deviceInfo.age}
              onChange={(e) =>
                setDeviceInfo({ ...deviceInfo, age: e.target.value })
              }
              className="p-2 border rounded"
            />
            <select
              value={deviceInfo.damageLevel}
              onChange={(e) =>
                setDeviceInfo({ ...deviceInfo, damageLevel: e.target.value })
              }
              className="p-2 border rounded"
            >
              <option value="minor">Minor Damage</option>
              <option value="moderate">Moderate Damage</option>
              <option value="severe">Severe Damage</option>
            </select>
          </div>

          <button
            onClick={getRecommendation}
            disabled={loading || !deviceInfo.name}
            className="mt-4 w-full bg-[#38a169] text-white px-6 py-3 rounded hover:bg-[#2f855a] disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Item"}
          </button>
        </div>

        {(streamingMessage || analysis) && (
          <div className="bg-white rounded-lg shadow-lg p-6 bg-[#f0f4f8]">
            <h2 className="text-2xl font-crimson-text mb-4">Results</h2>
            <div className="prose max-w-none space-y-4">
              <div className="p-4 bg-[#f7fafc] rounded-lg">
                {streamingMessage || analysis}
              </div>
            </div>
          </div>
        )}

        {repairShops.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 bg-[#f0f4f8]">
            <h2 className="text-2xl font-crimson-text mb-4">
              Nearby Repair Options
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {repairShops.map((shop, index) => (
                <div key={index} className="p-4 bg-[#f7fafc] rounded-lg">
                  <h3 className="font-bold text-lg">{shop.name}</h3>
                  <p className="text-[#4a5568]">{shop.full_address}</p>
                  {shop.rating && (
                    <p className="mt-2">
                      {shop.rating} ⭐ ({shop.review_count} reviews)
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;
