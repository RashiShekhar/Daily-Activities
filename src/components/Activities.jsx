import React from "react";

export default function Activities() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Add New Task
      </h2>

      <form className="space-y-6 mb-12">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Task
          </label>
          <input
            type="text"
            placeholder="Describe your task"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
        >
          Add Task
        </button>
      </form>

      <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
        Your Tasks
      </h3>
    </div>
  );
}
