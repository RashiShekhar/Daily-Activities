import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const quotes = [
  "Make each day your masterpiece. – John Wooden",
  "Your future is created by what you do today, not tomorrow. – Robert Kiyosaki",
  "Small steps every day lead to big changes.",
  "Focus on being productive instead of busy. – Tim Ferriss",
  "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
];

export default function Intro() {
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-500 bg-[length:200%_200%] animate-gradient-x z-0" />

      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl text-center backdrop-blur-md bg-opacity-70"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Your Daily Planner
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Stay focused. Stay organized. Achieve more.
          </p>

          <blockquote className="italic text-indigo-700 text-md border-l-4 border-indigo-300 pl-4 mb-6">
            “{quote}”
          </blockquote>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            onClick={() => navigate("/login")}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
