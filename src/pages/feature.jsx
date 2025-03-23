// "use client";
// import React, { useState } from "react";
// import { useUpload } from "../utilities/runtime-helpp";
// import Navbar from "../components/Navbar"; // Import the Navbar component

// function MainComponent() {
//   const [location, setLocation] = useState("");
//   const [pickupDate, setPickupDate] = useState("");
//   const [wasteType, setWasteType] = useState("");
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [upload, { loading: uploadLoading }] = useUpload();
//   const [error, setError] = useState(null);
//   const [pickupStatus, setPickupStatus] = useState(null);
//   const [userStats, setUserStats] = useState({
//     totalItems: 0,
//     totalCO2: 0,
//   });
//   const [leaderboardData, setLeaderboardData] = useState([
//     { name: "Sarah Chen", items: 15, co2: 45, emoji: "🥇" },
//     { name: "Mike Johnson", items: 12, co2: 36, emoji: "🥈" },
//     { name: "Emma Davis", items: 10, co2: 30, emoji: "🥉" },
//   ]);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const { url, error } = await upload({ file });
//       if (error) {
//         setError(error);
//         return;
//       }
//       setImage(url);
//     }
//   };

//   const schedulePickup = () => {
//     if (!location || !pickupDate || !wasteType || !name) {
//       setError("Please fill in all required fields");
//       return;
//     }
//     setPickupStatus("Your pickup has been scheduled! ✅");
//     setError(null);

//     const co2Saved = wasteType === "electronics" ? 3 : wasteType === "appliances" ? 5 : wasteType === "batteries" ? 1 : 2;

//     setUserStats((prev) => ({
//       totalItems: prev.totalItems + 1,
//       totalCO2: prev.totalCO2 + co2Saved,
//     }));

//     setLeaderboardData((prev) => {
//       const newEntry = { name, items: 1, co2: co2Saved, emoji: "🌱" };
//       const newData = [...prev, newEntry]
//         .sort((a, b) => b.co2 - a.co2)
//         .slice(0, 3)
//         .map((item, i) => ({
//           ...item,
//           emoji: i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉",
//         }));
//       return newData;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f6f8] p-6">
//       <Navbar /> {/* Include Navbar here */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold text-[#1a5f7a] mb-4">📦 Schedule E-Waste Pickup</h2>
//           <div className="space-y-4">
//             <input type="text" placeholder="Your Name*" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
//             <input type="text" placeholder="Location*" className="w-full p-2 border rounded" value={location} onChange={(e) => setLocation(e.target.value)} />
//             <select className="w-full p-2 border rounded" value={wasteType} onChange={(e) => setWasteType(e.target.value)}>
//               <option value="">Select Waste Type</option>
//               <option value="electronics">Electronics</option>
//               <option value="appliances">Appliances</option>
//               <option value="batteries">Batteries</option>
//               <option value="other">Other</option>
//             </select>
//             <input type="date" className="w-full p-2 border rounded" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
//             <input type="file" onChange={handleImageUpload} className="w-full p-2 border rounded" />
//             <button onClick={schedulePickup} disabled={uploadLoading} className="w-full bg-[#1a5f7a] text-white py-2 rounded hover:bg-[#134960] disabled:opacity-50">
//               {uploadLoading ? "Uploading..." : "Schedule Pickup"}
//             </button>
//             {pickupStatus && <p className="text-green-600 font-bold">{pickupStatus}</p>}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6 mt-6">
//           <h2 className="text-xl font-semibold text-[#1a5f7a] mb-4">🌱 Your Recycling Impact</h2>
//           <p><strong>Total Items Recycled:</strong> {userStats.totalItems}</p>
//           <p><strong>Total CO₂ Saved:</strong> {userStats.totalCO2} kg</p>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6 mt-6">
//           <h2 className="text-xl font-semibold text-[#1a5f7a] mb-4">🏆 Top Recyclers</h2>
//           <ul>
//             {leaderboardData.map((user, index) => (
//               <li key={index} className="p-2 border rounded mb-2">
//                 {user.emoji} {user.name} - {user.items} items recycled, {user.co2}kg CO₂ saved
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainComponent;
