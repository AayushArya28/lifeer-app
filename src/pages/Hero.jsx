import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    emoji: "🧠",
    title: "Smart Notes",
    desc: "Create, edit, and reorder your daily tasks with ease.",
  },
  {
    emoji: "💪",
    title: "Workout Tracker",
    desc: "Track your exercise routines with day-wise organization.",
  },
  {
    emoji: "📊",
    title: "Progress Dashboard",
    desc: "Visualize your daily goals and monitor your achievements.",
  },
  {
    emoji: "🌙",
    title: "Dark Mode",
    desc: "Switch to a soothing dark theme for late-night use.",
  },
  {
    emoji: "🔐",
    title: "Secure Auth",
    desc: "User authentication powered by Firebase for data safety.",
  },
  {
    emoji: "🚀",
    title: "More Coming Soon!",
    desc: "Expense tracking, meal planner, water intake, reminders, and more!",
  },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden min-h-screen text-gray-800 px-6 py-16 flex flex-col items-center bg-gradient-to-tr from-[#e0f2fe] via-white to-[#f0fdf4]">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-5rem] left-[-5rem] w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-[-4rem] right-[-4rem] w-80 h-80 bg-emerald-200 rounded-full filter blur-3xl opacity-30 animate-pulse delay-200" />
      <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full blur-[120px] opacity-30 z-0" />

      {/* Header */}
      <div className="relative z-10 max-w-4xl text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-800 leading-tight drop-shadow">
          Lifeer – Manage Life, Smarter.
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Your all-in-one life management dashboard to simplify habits,
          structure days, and track progress.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Create Account
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white border border-blue-600 text-blue-700 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="text-3xl mb-2">{feat.emoji}</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-1">
              {feat.title}
            </h3>
            <p className="text-gray-600 text-sm">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-16 text-center text-gray-400 text-sm">
        Made with ❤️ by Aayush Arya & Contributors | Lifeer App
      </div>
    </div>
  );
};

export default Hero;
