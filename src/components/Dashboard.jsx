import React from "react";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        Good evening, Alex 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card title="Activities Completed" value="5 / 8" />
        <Card title="Time Spent" value="3h 45m" />
        <Card title="Tasks Left" value="3" />
        <Card title="Weekly Streak" value="4 days" />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          Today's Tasks
        </h2>
        <ul className="space-y-4"></ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          Weekly Progress
        </h2>
        <div className="bg-gray-100 rounded-lg shadow p-8 h-48 flex items-center justify-center text-gray-400 italic">
          [Your Chart Goes Here]
        </div>
      </section>

      <section className="mb-12 max-w-xl mx-auto">
        <blockquote className="border-l-4 border-blue-600 pl-6 italic text-gray-600 text-center">
          “Discipline is choosing between what you want now and what you want
          most.”
        </blockquote>
      </section>

      <div className="text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
          Go to Settings
        </button>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center justify-center shadow">
      <span className="text-blue-700 text-sm font-semibold mb-2">{title}</span>
      <span className="text-4xl font-extrabold text-blue-900">{value}</span>
    </div>
  );
}
