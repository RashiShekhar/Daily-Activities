import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <motion.div
      className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-gray-800 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Good evening, {user?.name || "there"} 👋
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <StatCard title="Activities Completed" value="5 / 8" />
        <StatCard title="Time Spent" value="3h 45m" />
        <StatCard title="Tasks Left" value="3" />
        <StatCard title="Weekly Streak" value="4 days" />
      </motion.div>

      {/* Today's Tasks */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          📌 Today's Tasks
        </h2>
        <ul className="space-y-4 text-gray-500 italic">
          <li>No tasks yet. Stay focused! 💪</li>
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          📈 Weekly Progress
        </h2>
        <div className="bg-gray-100 rounded-xl shadow-inner p-8 h-48 flex items-center justify-center text-gray-400 italic">
          [Your Chart Goes Here]
        </div>
      </section>

      <motion.section
        className="mb-14 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <blockquote className="border-l-4 border-blue-600 pl-6 italic text-gray-600 text-center">
          “Discipline is choosing between what you want now and what you want
          most.”
        </blockquote>
      </motion.section>

      {/* CTA Button */}
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          onClick={() => navigate("/dashboard/settings")}
        >
          Go to Settings
        </motion.button>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      className="bg-blue-50 rounded-xl p-6 flex flex-col items-center justify-center shadow hover:shadow-md transition"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <span className="text-blue-700 text-sm font-semibold mb-2 uppercase tracking-wide">
        {title}
      </span>
      <span className="text-3xl font-extrabold text-blue-900">{value}</span>
    </motion.div>
  );
}
