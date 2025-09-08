const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res
      .status(201)
      .json({
        message: "User created",
        user: { name: user.name, email: user.email },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup" });
  }
});
