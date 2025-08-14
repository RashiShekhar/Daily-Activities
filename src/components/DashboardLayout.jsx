// components/DashboardLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 z-10">
        <NavBar />
      </div>

      {/* Main content with left margin */}
      <div className="ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
}
