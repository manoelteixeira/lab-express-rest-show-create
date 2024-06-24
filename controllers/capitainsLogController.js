// controllers/capitainsLogController.js
const express = require("express");
const logs = express.Router();

const logsArray = require("../models/log");
const {
  orderLogByCaptainName,
  getLogsByMistakes,
  getLogsBydaysSinceLastCrisis,
} = require("../utils");

logs.get("/", (req, res) => {
  const validQueries = ["order", "mistakes", "lastCrisis"];
  const query = Object.keys(req.query)[0];
  let data;
  switch (query) {
    case "order":
      data = orderLogByCaptainName(logsArray, req.query[query]);
      break;
    case "mistakes":
      data = getLogsByMistakes(logsArray, req.query[query]);
      break;
    case "lastCrisis":
      data = getLogsBydaysSinceLastCrisis(logsArray, req.query[query]);
      break;
    default:
      data = logsArray;
  }
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ error: "Not Found." });
  }
});

logs.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logsArray[arrayIndex]) {
    res.status(200).json(logsArray[arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

logs.post("/", (req, res) => {
  const {
    captainName,
    title,
    post,
    mistakesWereMadeToday,
    daysSinceLastCrisis,
  } = req.body;
  const validRequest =
    captainName &&
    title &&
    post &&
    mistakesWereMadeToday &&
    daysSinceLastCrisis;
  if (validRequest) {
    logsArray.push({
      captainName,
      title,
      post,
      mistakesWereMadeToday,
      daysSinceLastCrisis,
    });
    res.status(201).json(logsArray[logsArray.length - 1]);
  }
});

module.exports = logs;
