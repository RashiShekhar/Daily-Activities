import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Activities from "./components/Activities";
import Calendar from "./components/Calendar";
import Settings from "./components/Settings";
import Music from "./components/Music";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="activities" element={<Activities />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />{" "}
          <Route path="music" element={<Music />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
