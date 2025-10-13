// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const taskRoutes = require("./routes/tasks");
// Middleware
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
