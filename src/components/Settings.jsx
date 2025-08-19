import React from "react";
import { motion } from "framer-motion";
import "./Settings.css";

export default function Settings() {
  return (
    <motion.div
      className="settings-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="settings-title">⚙️ Settings</h1>

      <motion.div
        className="section user-details"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2>User Details</h2>
        <div className="detail-row">
          <span className="label">Name:</span>
          <span className="value">[User Name]</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">[User Email]</span>
        </div>
      </motion.div>

      <motion.div
        className="section theme-section"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Theme</h2>
        <div className="detail-row">
          <span className="label">Current Theme:</span>
          <span className="value">[Light/Dark]</span>
        </div>
        <button className="theme-toggle-btn">🌗 Switch Theme</button>
      </motion.div>
    </motion.div>
  );
}
