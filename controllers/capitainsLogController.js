// controllers/capitainsLogController.js
const express = require("express");
const logs = express.Router();

const logsArray = require("../models/log");
const {
  validateLog,
  orderLogByCaptainName,
  getLogsByMistakes,
  getLogsBydaysSinceLastCrisis,
} = require("../helpers/utils");

logs.get("/", (req, res) => {
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
  const log = req.body;
  if (validateLog(log)) {
    logsArray.push(log);
    res.status(201).json(logsArray[logsArray.length - 1]);
  } else {
    res.status(400).json({ error: "Something went wrong" });
  }
});

logs.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const log = logsArray[arrayIndex];
  if (log) {
    logsArray.splice(arrayIndex, 1);
    res.status(200).json(log);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = logs;
