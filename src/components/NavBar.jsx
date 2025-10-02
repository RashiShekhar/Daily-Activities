import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineArtTrack } from "react-icons/md";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Activities", path: "/dashboard/activities" },
    { name: "Calendar", path: "/dashboard/calendar" },
    { name: "Music", path: "/dashboard/music" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 font-bold text-xl text-blue-600 space-x-2 group cursor-pointer">
        <MdOutlineArtTrack className="text-2xl transform transition-transform duration-300 group-hover:rotate-12" />
        <span>DailyTrack</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 animate-slide-in-left">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
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
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
