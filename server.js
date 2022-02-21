const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const habitsRoutes = require("./routes/habits");

server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/habits", habitsRoutes);

// Root route
server.get("/", (req, res) => res.send("Hello, client!"));

module.exports = server;
