const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());

const authRoutes = require("./controllers/auth");
const userRoutes = require("./controllers/users");
const habitRoutes = require("./controllers/habits");

server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/habits", habitRoutes);

// Root route
server.get("/", (req, res) => res.send("Hello, client!"));

module.exports = server;
