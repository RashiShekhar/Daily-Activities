import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineArtTrack } from "react-icons/md";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Activities", path: "/activities" },
    { name: "Calendar", path: "/calendar" },
    { name: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 font-bold text-xl text-blue-600 space-x-2">
        <MdOutlineArtTrack className="text-2xl" />
        <span>DailyTrack</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
