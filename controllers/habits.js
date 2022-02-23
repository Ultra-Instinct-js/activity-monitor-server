const express = require("express");
const router = express.Router({ mergeParams: true });
const Habit = require("../models/Habit");
const { verifyToken } = require("../middleware/verifyUser");

//create habit
router.post("/", verifyToken, async (req, res) => {
  try {
    const habit = await Habit.create(req.params.userId, req.body);
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//return habits
router.get("/", verifyToken, async (req, res) => {
  try {
    const id = req.params.userId;
    const habits = await Habit.getAll(id);
    res.json(habits);
  } catch (err) {
    res.status(404).send(err);
  }
});

//update habit
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const habitToUpdate = await Habit.findById(req.params.id);
    const updatedHabit = await habitToUpdate.updateProgress(req.body.progress);
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(500).json({ err });
  }
});

//delete habit
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    await habit.destroy();
    res.status(204).json("Habit removed");
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
