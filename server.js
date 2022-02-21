const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());

const authRoutes = require("./controllers/auth");
const userRoutes = require("./controllers/users");

server.use("/auth", authRoutes);
server.use("/users", userRoutes);
// Root route
server.get("/", (req, res) => res.send("Hello, client!"));

module.exports = server;
