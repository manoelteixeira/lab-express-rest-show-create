function orderLogByCaptainName(arr, method = "asc") {
  if (method == "asc") {
    return arr.sort((a, b) => {
      if (a.captainName < b.captainName) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (method == "desc") {
    return arr.sort((a, b) => {
      if (a.captainName > b.captainName) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    return null;
  }
}

function getLogsByMistakes(arr, param) {
  const value = param == "true" ? true : param == "false" ? false : null;

  if (value != null) {
    return arr.filter((log) => log.mistakesWereMadeToday == value);
  } else {
    null;
  }
}

function getLogsBydaysSinceLastCrisis(arr, value) {
  let method, days;
  if (value.includes("gte")) {
    method = "gte";
    days = Number(value.replace("gte", ""));
  } else if (value.includes("gt")) {
    method = "gt";
    days = Number(value.replace("gt", ""));
  } else if (value.includes("lte")) {
    method = "lte";
    days = Number(value.replace("lte", ""));
  } else if (value.includes("lt")) {
    method = "lt";
    days = Number(value.replace("lt", ""));
  } else if (value.includes("eq")) {
    method = "eq";
    days = Number(value.replace("eq", ""));
  }

  if (method === undefined || isNaN(days)) {
    return null;
  }
  let data;
  switch (method) {
    case "gte":
      data = arr.filter((log) => log.daysSinceLastCrisis >= days);
      break;
    case "gt":
      data = arr.filter((log) => log.daysSinceLastCrisis > days);
      console.log(data);
      break;
    case "lte":
      data = arr.filter((log) => log.daysSinceLastCrisis <= days);
      break;
    case "lt":
      data = arr.filter((log) => log.daysSinceLastCrisis < days);
      break;
    case "eq":
      data = arr.filter((log) => log.daysSinceLastCrisis == days);
      break;
    default:
      data = null;
      break;
  }
  return data;
}

module.exports = {
  orderLogByCaptainName,
  getLogsByMistakes,
  getLogsBydaysSinceLastCrisis,
};
