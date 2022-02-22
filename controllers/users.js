const express = require("express");
const router = express.Router();
const User = require("../models/User");
const habitRoutes = require("./habits");
const { verifyToken } = require("../middleware/verifyUser");

//delete user
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const user = User.findByUsername(req.params.id);
    console.log("found user");
    await user.destroy();
    res.status(204).json("User deleted");
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.use("/:userId/habits", habitRoutes);

module.exports = router;
