"use client";
import React, { useState } from "react";
// import * as Recharts from "recharts";
import * as ReactGoogleMaps from "@/libraries/react-google-maps";
import { useUpload } from "@/utilities/runtime-helpp";

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function MainComponent() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [upload, { loading: uploadLoading }] = useUpload();
  const [error, setError] = useState(null);
  const [pickupStatus, setPickupStatus] = useState(null);
  const [userStats, setUserStats] = useState({
    totalItems: 0,
    totalCO2: 0,
    history: [],
  });
  const [leaderboardData, setLeaderboardData] = useState([
    { name: "Sarah Chen", items: 15, co2: 45, emoji: "🥇" },
    { name: "Mike Johnson", items: 12, co2: 36, emoji: "🥈" },
    { name: "Emma Davis", items: 10, co2: 30, emoji: "🥉" },
  ]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { url, error } = await upload({ file });
      if (error) {
        setError(error);
        return;
      }
      setImage(url);
    }
  };

  const schedulePickup = () => {
    if (!location || !pickupDate || !wasteType || !name) {
      setError("Please fill in all required fields");
      return;
    }
    setPickupStatus("scheduled");
    setError(null);

    const co2Saved =
      wasteType === "electronics"
        ? 3
        : wasteType === "appliances"
        ? 5
        : wasteType === "batteries"
        ? 1
        : 2;

    setUserStats((prev) => ({
      totalItems: prev.totalItems + 1,
      totalCO2: prev.totalCO2 + co2Saved,
      history: [
        ...prev.history,
        {
          date: pickupDate,
          type: wasteType,
          co2: co2Saved,
        },
      ],
    }));

    setLeaderboardData((prev) => {
      const newData = [
        ...prev,
        {
          name: name,
          items: 1,
          co2: co2Saved,
          emoji: "🌱",
        },
      ]
        .sort((a, b) => b.co2 - a.co2)
        .slice(0, 3)
        .map((item, i) => ({
          ...item,
          emoji: i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉",
        }));
      return newData;
    });
  };

  return (
    <div
      className="min-h-screen bg-[#f5f6f8]"
      style={{
        backgroundImage:
          "url('https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-thelily-washpost.s3.amazonaws.com/public/SGOVWGXKJNEE3M6DEJF6RAQ6LQ.gif&w=1200')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="bg-[#1a5f7a] text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-crimson-text text-center">
            ♻️ E-Waste Collection
          </h1>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
          <h2 className="text-xl font-medium text-[#1a5f7a] mb-4">
            📦 Schedule E-Waste Pickup
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name*
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Location*
              </label>
              <input
                type="text"
                placeholder="Enter your address"
                className="w-full p-2 border rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Waste Type*
              </label>
              <select
                className="w-full p-2 border rounded"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="electronics">Electronics</option>
                <option value="appliances">Appliances</option>
                <option value="batteries">Batteries</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Pickup Date*
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Images (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            <button
              onClick={schedulePickup}
              disabled={uploadLoading}
              className="w-full bg-[#1a5f7a] text-white py-2 rounded hover:bg-[#134960] disabled:opacity-50"
            >
              {uploadLoading ? "Uploading Image..." : "Schedule Pickup"}
            </button>
            {pickupStatus && (
              <div className="mt-4 p-3 bg-[#e8f4f8] rounded">
                <h3 className="font-medium mb-2">Pickup Status</h3>
                <div className="flex items-center">
                  <span className="text-sm">
                    ✅ Your pickup has been scheduled!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto mt-6">
          <h2 className="text-xl font-medium text-[#1a5f7a] mb-4">
            📊 Your Recycling Impact
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#f8f9fa] p-4 rounded">
              <p className="text-sm text-gray-600">Total Items Recycled</p>
              <p className="text-2xl font-medium">{userStats.totalItems}</p>
            </div>
            <div className="bg-[#f8f9fa] p-4 rounded">
              <p className="text-sm text-gray-600">Total CO2 Saved</p>
              <p className="text-2xl font-medium">{userStats.totalCO2}kg</p>
            </div>
          </div>
          {userStats.history.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {userStats.history.slice(-3).map((item, index) => (
                  <div key={index} className="bg-[#f8f9fa] p-3 rounded text-sm">
                    <div className="flex justify-between">
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                      <span>{item.type}</span>
                      <span>{item.co2}kg CO2 saved</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <h2 className="text-xl font-medium text-[#1a5f7a] mb-4">
            🏆 Top Recyclers
          </h2>
          <div className="space-y-3">
            {leaderboardData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.items} items recycled
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">CO2 saved</p>
                  <p className="text-xl font-medium">{item.co2}kg</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
