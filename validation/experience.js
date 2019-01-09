//Validate users login information
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Experience title field is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "Experience start date field is required";
  }

  if (!validator.isBefore(data.from)) {
    errors.from = "Experience start date must be before today";
  }

  if (validator.isEmpty(data.to) && data.current !== true) {
    errors.to = "Experience end date field is required";
  }

  if (!validator.isBefore(data.to) && data.current !== true) {
    errors.to = "Experience end date must be before today";
  }

  if (!validator.isAfter(data.to, data.from) && data.current !== true) {
    errors.to = "Experience from date must be after start date";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
