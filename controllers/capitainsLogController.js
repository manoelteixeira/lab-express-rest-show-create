// controllers/capitainsLogController.js
const express = require("express");
const logs = express.Router();

const logsArray = require("../models/log");
// Import Helper Functions
const {
  orderLogByCaptainName,
  getLogsByMistakes,
  getLogsBydaysSinceLastCrisis,
} = require("../helpers/utils");

// Import Middleware Functions
const {
  checkForCaptainNameKey,
  checkForTitleKey,
  checkForPostKey,
  checkForMistakesWereMadeTodayKey,
  checkForDaysSinceLastCrisisKey,
} = require("../validations/capitainLogValidation");

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
  if (!data) {
    res.status(404).redirect("*");
  } else {
    res.status(200).json(data);
  }
});

logs.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const log = logsArray[arrayIndex];
  if (!log) {
    res.status(404).redirect("*");
  } else {
    res.status(200).json(logsArray[arrayIndex]);
  }
});

logs.delete("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const log = logsArray[arrayIndex];
  if (!log) {
    res.status(404).redirect("*");
  } else {
    logsArray.splice(arrayIndex, 1);
    res.status(200).json(log);
  }
});

logs.post(
  "/",
  checkForCaptainNameKey,
  checkForTitleKey,
  checkForPostKey,
  checkForMistakesWereMadeTodayKey,
  checkForDaysSinceLastCrisisKey,
  (req, res) => {
    logsArray.push(req.body);
    res.status(201).json(logsArray[logsArray.length - 1]);
  }
);

logs.put(
  "/:arrayIndex",
  checkForCaptainNameKey,
  checkForTitleKey,
  checkForPostKey,
  checkForMistakesWereMadeTodayKey,
  checkForDaysSinceLastCrisisKey,
  (req, res) => {
    const { arrayIndex } = req.params;
    const log = logsArray[arrayIndex];
    const updatedLog = req.body;

    if (!log) {
      res.status(404).redirect("*");
    } else {
      logsArray[arrayIndex] = updatedLog;

      res.status(202).json(updatedLog);
    }
  }
);

module.exports = logs;
