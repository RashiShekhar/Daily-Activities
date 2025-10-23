import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Settings.css";

export default function Settings() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <motion.div
      className="settings-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="settings-title">⚙️ Settings</h1>

      {/* User Info Card */}
      <motion.div
        className="user-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="avatar">
          <span>{user.name ? user.name[0].toUpperCase() : "?"}</span>
        </div>

        <div className="user-info">
          <h2>{user.name || "Guest User"}</h2>
          <p>{user.email || "No email available"}</p>
        </div>
      </motion.div>

      {/* Account Section */}
      <motion.div
        className="section"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3>Account</h3>
        <div className="detail-row">
          <span className="label">Name</span>
          <span className="value">{user.name || "Not Available"}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email</span>
          <span className="value">{user.email || "Not Available"}</span>
        </div>
      </motion.div>

      {/* Theme Toggle Placeholder */}
      <motion.button
        className="theme-toggle-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🌗 Toggle Theme
      </motion.button>
    </motion.div>
  );
}
