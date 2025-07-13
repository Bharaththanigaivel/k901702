const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send("Not found");
  res.send(task);
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).send("Not found");
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).send("Not found");
  res.send({ message: "Deleted successfully" });
});

module.exports = router;
