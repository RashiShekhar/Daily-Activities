import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Motivational Quotes
const motivationalQuotes = [
  "Discipline is choosing between what you want now and what you want most.",
  "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
  "Push yourself, because no one else is going to do it for you.",
  "Small steps every day lead to big results.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Motivation gets you going, but discipline keeps you growing.",
];

// Productivity Tips
const productivityTips = [
  "Use the Pomodoro technique: 25 min work, 5 min break.",
  "Tackle your hardest task first — it's called 'eating the frog'.",
  "Clear distractions: phone off, tabs closed.",
  "Batch similar tasks to stay in flow.",
  "Review your goals every morning.",
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [quote, setQuote] = useState("");

  // Load tasks and random quote on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      const normalizedTasks = parsed.map((task) =>
        typeof task === "string" ? { name: task } : task
      );
      setTasks(normalizedTasks);
    }

    // Pick a random motivational quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  // Calculate total time spent
  const totalMinutes = tasks.reduce(
    (acc, task) => acc + (task.duration || 0),
    0
  );
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeSpentStr = `${hours}h ${minutes}m`;

  // Productivity Tip of the Day
  const tipIndex = new Date().getDate() % productivityTips.length;
  const dailyTip = productivityTips[tipIndex];

  // Mark task complete
  const handleMarkDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Greeting */}
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-gray-800 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Good evening, {user?.name || "there"} 👋
      </motion.h1>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        <StatCard title="Activities Completed" value={tasks.length || 0} />
        <StatCard title="Time Spent" value={timeSpentStr} />
        <StatCard
          title="Tasks Left"
          value={tasks.filter((t) => !t.completed).length}
        />
        <StatCard title="Weekly Streak" value="4 days" />
      </motion.div>

      {/* Time Spent Today Section (New) */}
      <section className="mb-14 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          ⏱️ Time Spent Today
        </h3>
        <div className="inline-block bg-blue-100 text-blue-800 font-semibold px-6 py-3 rounded-full text-lg shadow">
          {timeSpentStr}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Goal: 4 hours (240 minutes)
        </p>
      </section>

      {/* Today's Tasks */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          📌 Today's Tasks
        </h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks yet. Stay focused! 💪</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <li
                key={task._id || index}
                className={`bg-gray-100 rounded-lg px-4 py-3 shadow-sm text-gray-800 flex items-center justify-between ${
                  task.completed ? "opacity-50 line-through" : ""
                }`}
              >
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">•</span>
                  <span>{task.name}</span>
                </div>
                {!task.completed && (
                  <button
                    onClick={() => handleMarkDone(index)}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Mark Done
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Motivational Quote */}
      <motion.section
        className="mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <blockquote className="border-l-4 border-blue-600 pl-6 italic text-gray-600 text-center">
          “{quote}”
        </blockquote>
      </motion.section>

      {/* Productivity Tip */}
      <section className="mb-14 max-w-xl mx-auto text-center">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          💡 Productivity Tip
        </h4>
        <p className="text-gray-600 italic">"{dailyTip}"</p>
      </section>

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

// StatCard component
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
