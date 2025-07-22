import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  "🧠 Notes – Add, edit, reorder by date",
  "💪 Exercise Tracking – Log sets & reps, day-wise view",
  "📊 Dashboard – View daily progress with visuals",
  "🔐 Secure Login with Firebase",
  "🌙 Dark Mode Toggle",
  "👤 Profile Page",
  "💰 Expense & Income Tracker (coming soon)",
  "🍽️ Meal & Water Tracker (coming soon)",
  "📅 Calendar View (coming soon)",
  "📈 Data Analytics & Charts (coming soon)",
  "💬 AI Suggestions (coming soon)",
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#ffffff] text-gray-800 flex flex-col items-center px-4 py-12">
      <h1 className="text-5xl md:text-6xl font-bold text-center text-blue-800 mb-4">
        Welcome to Lifeer
      </h1>
      <p className="text-center text-lg md:text-xl max-w-3xl mb-8 text-gray-600">
        Your all-in-one life management dashboard to organize, track, and grow.
      </p>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">✨ Features:</h2>
        <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
          {features.map((item, index) => (
            <li key={index} className="flex items-start gap-2">{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-200"
        >
          Create an Account
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-gray-100 text-blue-700 border border-blue-600 rounded-xl hover:bg-gray-200 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Hero;
