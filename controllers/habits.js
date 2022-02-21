const express = require("express");
const router = express.Router({ mergeParams: true });
const Habit = require("../models/Habit");
const { verifyToken } = require("../middleware/verifyUser");

//return habits
router.get("/", verifyToken, async (req, res) => {
  try {
    const habits = await Habit.all(req.params.userId);
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
    res.status(204).json(updatedHabit);
  } catch (err) {
    res.status(500).json({ err });
  }
});

//delete habit
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const habit = Habit.findById(req.params.id);
    await habit.destroy();
    res.status(204).json("Habit removed");
  } catch (err) {
    res.status(500).json({ err });
  }
});
