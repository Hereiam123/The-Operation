//Validate users login information
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Text field must be between 10 and 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
