import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasksWithDates");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem("tasksWithDates", JSON.stringify(tasks));
  }, [tasks]);

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getDateString = (day) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

  const selectedDateStr =
    selectedDay !== null ? getDateString(selectedDay) : null;

  const tasksForSelectedDay = selectedDateStr
    ? tasks.filter((task) => task.date === selectedDateStr)
    : [];

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((y) => y - 1);
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((y) => y + 1);
    setSelectedDay(null);
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now(),
      date: selectedDateStr,
      name: newTask.trim(),
    };
    setTasks((prev) => [...prev, newTaskObj]);
    setNewTask("");
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={goToPrevMonth}
          className="text-blue-600 hover:text-blue-800 font-bold"
        >
          &larr; Prev
        </button>
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          {monthName} {currentYear}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-blue-600 hover:text-blue-800 font-bold"
        >
          Next &rarr;
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-4 text-center text-gray-500 font-semibold uppercase tracking-wider">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3 text-center">
        {[...Array(firstDayIndex)].map((_, i) => (
          <div key={"pad" + i}></div>
        ))}

        {daysArray.map((day) => {
          const dayStr = getDateString(day);
          const hasTasks = tasks.some((task) => task.date === dayStr);
          const isSelected = day === selectedDay;
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <motion.div
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-16 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : isToday
                  ? "bg-blue-100 text-blue-800 font-bold"
                  : "hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg">{day}</span>
              {hasTasks && (
                <motion.div
                  layoutId="task-dot"
                  className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-500"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Tasks for Selected Day */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            key="task-list"
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-700">
              Tasks for {selectedDateStr}
            </h3>

            {/* Add Task */}
            <div className="flex mb-4 gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>

            {tasksForSelectedDay.length === 0 ? (
              <p className="text-gray-500 italic">
                No tasks scheduled for this day.
              </p>
            ) : (
              <ul className="space-y-3">
                {tasksForSelectedDay.map((task) => (
                  <li
                    key={task.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-blue-500 flex justify-between items-center"
                  >
                    <span>{task.name}</span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
