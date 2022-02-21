const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Habit = require("../models/Habit");

//return user
router.get("/:id", async (req, res) => {});

//return habits
router.get("/:id/habits", async (req, res) => {
  try {
    const habits = await Habit.all;
    res.json(habits);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete user
router.delete("/:id", async (req, res) => {});

//update habit
router.patch("/:id/habits/:id", async (req, res) => {});
