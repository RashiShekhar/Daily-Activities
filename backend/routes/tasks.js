const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks for a specific date
router.get("/", async (req, res) => {
  const { date } = req.query;
  try {
    const tasks = date ? await Task.find({ date }) : await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  const { name, date } = req.body;
  if (!name || !date) {
    return res.status(400).json({ error: "Task name and date are required" });
  }
  try {
    const newTask = new Task({ name, date });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
