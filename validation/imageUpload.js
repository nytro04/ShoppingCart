const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.image = !isEmpty(data.image) ? data.image : "";

  if (Validator.isEmpty(data.image)) {
    errors.image = "No file uploaded";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
