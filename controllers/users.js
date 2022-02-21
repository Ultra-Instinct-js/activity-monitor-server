const express = require("express");
const router = express.Router();
const User = require("../models/User");
const habitRoutes = require("./habits");

//delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = User.findByUsername(req.params.id);
    await user.destroy();
    res.status(204).json("User deleted");
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.use("/habits", habitRoutes);
