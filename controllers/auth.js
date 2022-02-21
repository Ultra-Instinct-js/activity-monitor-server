const express = require("express");
const router = express.Router();

//confirm user exists and return token
router.post("/login", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
});

//create user
router.post("/register", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
});
