const express = require("express");

// Import Controllers
const capitainsLogController = require("./controllers/capitainsLogController");

// Create an instance of the express server
const app = express();

// Middleware
app.use(express.json()); // Enable app to accecpt JSON from POST and PUT requests
app.use("/logs", capitainsLogController);

// Home Route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the captain's log");
});

module.exports = app;
