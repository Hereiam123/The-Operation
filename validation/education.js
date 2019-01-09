//Validate users login information
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  if (validator.isEmpty(data.school)) {
    errors.title = "School field is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
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
