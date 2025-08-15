import React, { useState, useEffect } from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  // Get current date info
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  // Sample tasks with dates (YYYY-MM-DD)
  const tasks = [
    { id: 1, date: "2025-08-05", name: "Morning Walk" },
    { id: 2, date: "2025-08-05", name: "Read a book" },
    { id: 3, date: "2025-08-10", name: "Meeting with team" },
    { id: 4, date: "2025-08-15", name: "Workout" },
  ];

  // Get month name
  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get day of week index the month starts on (0=Sun,...)
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Generate array for days
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Filter tasks for selected day
  const selectedDateStr =
    selectedDay !== null
      ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
          selectedDay
        ).padStart(2, "0")}`
      : null;
  const tasksForSelectedDay = selectedDateStr
    ? tasks.filter((task) => task.date === selectedDateStr)
    : [];

  // Change month handlers
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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      {/* Month and year header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={goToPrevMonth}
          className="text-blue-600 hover:text-blue-800 font-bold"
        >
          &lt; Prev
        </button>
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          {monthName} {currentYear}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-blue-600 hover:text-blue-800 font-bold"
        >
          Next &gt;
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-4 text-center text-gray-600 font-semibold">
        {weekdays.map((day) => (
          <div key={day} className="uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Padding days for first day alignment */}
        {[...Array(firstDayIndex)].map((_, i) => (
          <div key={"pad" + i} />
        ))}

        {daysArray.map((day) => {
          // Check if day has tasks
          const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;
          const hasTasks = tasks.some((task) => task.date === dayStr);

          // Highlight selected day
          const isSelected = day === selectedDay;

          return (
            <div
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-16 flex flex-col items-center justify-center rounded-lg cursor-pointer transition ${
                isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"
              }`}
            >
              <span className="text-lg font-semibold">{day}</span>
              {hasTasks && (
                <div className="mt-1 w-3 h-3 rounded-full bg-blue-600"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tasks list for selected day */}
      {selectedDay && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4">
            Tasks for {monthName} {selectedDay}, {currentYear}
          </h3>
          {tasksForSelectedDay.length === 0 ? (
            <p className="text-gray-600">No tasks for this day.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-2 text-gray-800">
              {tasksForSelectedDay.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
