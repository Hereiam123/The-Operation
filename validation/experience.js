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

  if (validator.isEmpty(data.to)) {
    errors.to = "Experience end date field is required, or state if current";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
