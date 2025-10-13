const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ date: -1 });
  res.json(tasks);
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Task name is required" });
    }

    const task = new Task({ name: name.trim() });
    await task.save();
    res.status(201).json(task); // ✅ Important: return the saved task
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a task (optional)
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
