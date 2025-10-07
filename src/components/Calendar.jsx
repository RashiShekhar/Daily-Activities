import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasksWithDates");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // For testing (optional): If you want to preload some tasks once
  // useEffect(() => {
  //   const sample = [
  //     { id: 1, date: "2025-10-07", name: "Morning Walk" },
  //     { id: 2, date: "2025-10-08", name: "Read Book" },
  //   ];
  //   localStorage.setItem("tasksWithDates", JSON.stringify(sample));
  // }, []);

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const selectedDateStr =
    selectedDay !== null
      ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
          selectedDay
        ).padStart(2, "0")}`
      : null;

  const tasksForSelectedDay = selectedDateStr
    ? tasks.filter((task) => task.date === selectedDateStr)
    : [];

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
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
          const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;
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

            {tasksForSelectedDay.length === 0 ? (
              <p className="text-gray-500 italic">
                No tasks scheduled for this day.
              </p>
            ) : (
              <ul className="space-y-3">
                {tasksForSelectedDay.map((task) => (
                  <li
                    key={task.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-blue-500 text-gray-800"
                  >
                    {task.name}
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
