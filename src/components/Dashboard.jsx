import React from "react";
import NavBar from "./NavBar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      </main>
    </div>
  );
}
