// src/app/home/page.jsx

"use client"; // Mark as a Client Component

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f4f9]">
      <h1 className="text-4xl font-bold text-green-500">
        Welcome to EsortAi
      </h1>

      <style jsx>{`
        h1 {
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }

        .min-h-screen {
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
