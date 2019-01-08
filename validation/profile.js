//Validate users login information
const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  data.twitter = !isEmpty(data.twitter) ? data.twitter : "";
  data.facebook = !isEmpty(data.facebook) ? data.facebook : "";
  data.instagram = !isEmpty(data.instagram) ? data.instagram : "";
  data.youtube = !isEmpty(data.youtube) ? data.youtube : "";
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (!isEmpty(data.youtube)) {
    if (
      !validator.isURL(data.youtube, {
        protocols: ["http", "https"],
        require_protocol: true
      })
    ) {
      errors.youtube = "Website needs a valid url (incl. http: or https:)";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (
      !validator.isURL(data.twitter, {
        protocols: ["http", "https"],
        require_protocol: true
      })
    ) {
      errors.twitter = "Website needs a valid url (incl. http: or https:)";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (
      !validator.isURL(data.facebook, {
        protocols: ["http", "https"],
        require_protocol: true
      })
    ) {
      errors.facebook = "Website needs a valid url (incl. http: or https:)";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (
      !validator.isURL(data.linkedin, {
        protocols: ["http", "https"],
        require_protocol: true
      })
    ) {
      errors.linkedin = "Website needs a valid url (incl. http: or https:)";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (
      !validator.isURL(data.instagram, {
        protocols: ["http", "https"],
        require_protocol: true
      })
    ) {
      errors.instagram = "Website needs a valid url (incl. http: or https:)";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
