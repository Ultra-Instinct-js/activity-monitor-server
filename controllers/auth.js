const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//create user
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await User.create(req.body.username, req.body.email, hashedPassword);
    res.status(201).json("User created");
  } catch (error) {
    res.status(500).json({ error });
  }
});

//confirm user exists and return token
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (!user) {
      throw new Error("User not found");
    }
    const authenticated = bcrypt.compare(req.body.password, user.hash);
    if (!!authenticated) {
      const payload = { username: user.username, email: user.email };
      jwt.sign(payload, "secret", { expiresIn: "12h" }, (err, token) => {
        if (err) {
          throw new Error("Error creating token");
        }
        res.status(200).json({
          success: true,
          token: "Bearer " + token,
          userId: user.userId
        });
      });
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (error) {
    res.status(401).json({ error });
  }
});

module.exports = router;
