// importing moment package
const moment = require("moment");

// is date
const isDate = (value) => {
  if (!value) {
    return false;
  }

  const date = moment(value, true);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

// is date after
const isDateAfter = (end, start) => {
  if (moment(start).isSameOrAfter(moment(end))) {
    return false;
  }
  return true;
};

// export
module.exports = {
  isDate,
  isDateAfter,
};
