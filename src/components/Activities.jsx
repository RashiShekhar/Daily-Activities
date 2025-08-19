import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Activities() {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      console.log("Task submitted:", task);
      setTask("");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-gray-800 mb-10 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        📝 Add New Task
      </motion.h2>

      <motion.form
        className="space-y-6 mb-12"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Task
          </label>
          <input
            type="text"
            placeholder="Describe your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-sm"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
        >
          ➕ Add Task
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
          📋 Your Tasks
        </h3>

        <p className="text-gray-500">No tasks yet. Start adding some!</p>
      </motion.div>
    </motion.div>
  );
}
