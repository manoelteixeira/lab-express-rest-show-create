// validations/capitainLogValidation.js

function checkForCaptainNameKey(req, res, next) {
  if (!req.body.hasOwnProperty("captainName")) {
    res.status(400).json({ error: "Capitains Log must have captainName key" });
  } else if (typeof req.body.captainName != "string") {
    res.status(400).json({ error: "captainName key must be a string" });
  } else {
    next();
  }
}

function checkForTitleKey(req, res, next) {
  if (!req.body.hasOwnProperty("title")) {
    res.status(400).json({ error: "Capitains Log must have title key" });
  } else if (typeof req.body.title != "string") {
    res.status(400).json({ error: "title key must be a string" });
  } else {
    next();
  }
}

function checkForPostKey(req, res, next) {
  if (!req.body.hasOwnProperty("post")) {
    res.status(400).json({ error: "Capitains Log must have title key" });
  } else if (typeof req.body.post != "string") {
    res.status(400).json({ error: "post key must be a string" });
  } else {
    next();
  }
}

function checkForMistakesWereMadeTodayKey(req, res, next) {
  if (!req.body.hasOwnProperty("mistakesWereMadeToday")) {
    res
      .status(400)
      .json({ error: "Capitains Log must have mistakesWereMadeToday key" });
  } else if (typeof req.body.mistakesWereMadeToday != "boolean") {
    res
      .status(400)
      .json({ error: "post mistakesWereMadeToday must be boolean" });
  } else {
    next();
  }
}

function checkForDaysSinceLastCrisisKey(req, res, next) {
  if (!req.body.hasOwnProperty("daysSinceLastCrisis")) {
    res
      .status(400)
      .json({ error: "Capitains Log must have daysSinceLastCrisis key" });
  } else if (typeof req.body.daysSinceLastCrisis != "number") {
    res.status(400).json({ error: "daysSinceLastCrisis key must be a number" });
  } else {
    next();
  }
}

module.exports = {
  checkForCaptainNameKey,
  checkForTitleKey,
  checkForPostKey,
  checkForMistakesWereMadeTodayKey,
  checkForDaysSinceLastCrisisKey,
};
