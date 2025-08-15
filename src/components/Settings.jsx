import React from "react";
import "./Settings.css";

export default function Settings() {
  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="section user-details">
        <h2>User Details</h2>
        <div className="detail-row">
          <span className="label">Name:</span>
          <span className="value">[User Name]</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">[User Email]</span>
        </div>
      </div>

      <div className="section theme-section">
        <h2>Theme</h2>
        <div className="detail-row">
          <span className="label">Current Theme:</span>
          <span className="value">[Light/Dark]</span>
        </div>
        <button className="theme-toggle-btn">Switch Theme</button>
      </div>
    </div>
  );
}
