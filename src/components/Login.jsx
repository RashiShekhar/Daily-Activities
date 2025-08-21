import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        nav("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error during login");
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-teal-300 to-indigo-500 bg-[length:200%_200%] animate-gradient-x z-0" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-sm w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
