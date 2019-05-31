const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  // if (!Validator.isLength(data.address, { min: 2, max: 50 })) {
  //   errors.address = "Address needs to between 2 and 50 characters";
  // }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
