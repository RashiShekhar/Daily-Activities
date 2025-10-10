import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format. Expected JSON.");
      }

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        nav("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Blue/Gradient Background Section */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-teal-400 to-indigo-600 bg-[length:200%_200%] animate-gradient-x z-0" />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 flex items-center justify-center w-full">
          <h1 className="text-4xl font-extrabold text-white text-center px-6 drop-shadow-xl">
            Welcome Back 👋
            <br />
            Let's Get You Logged In
          </h1>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        {" "}
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
          {" "}
          <h1 className="text-3xl lg:text-4xl font-extrabold text-black text-center mb-6">
            {" "}
            Log In{" "}
          </h1>{" "}
          <form onSubmit={handleLogin} className="space-y-6">
            {" "}
            <div>
              {" "}
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                {" "}
                Email{" "}
              </label>{" "}
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter your email"
                required
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                {" "}
                Password{" "}
              </label>{" "}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter your password"
                required
              />{" "}
            </div>{" "}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Log In{" "}
            </button>{" "}
          </form>{" "}
          <p className="mt-4 text-sm text-gray-500 text-center">
            Don’t have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/signup">
              {" "}
              Sign up{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>
    </div>
  );
}

export default Login;
