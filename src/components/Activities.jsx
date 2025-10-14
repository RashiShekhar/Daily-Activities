import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Activities() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "http://localhost:5000/tasks";
  // Change this if deployed

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to load tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Submit new task to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedTask }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
      setTask("");
    } catch (err) {
      console.error(err);
      setError("Failed to add task. Please try again.");
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

      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
          📋 Your Tasks
        </h3>

        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet. Start adding some!</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((t) => (
              <li
                key={t._id}
                className="flex items-start bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <span className="text-blue-600 font-bold mr-2">•</span>
                <span className="text-gray-800">{t.name}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}
