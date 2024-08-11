export const validateProfileForm = (formData) => {
  const errors = {};

  const requiredFields = [
    "first_name",
    "last_name",
    "date_of_birth",
    "gender",
    "nationality",
    "address",
    "city",
    "country_of_residence",
    "mobile",
    "mobile_during_travel",
    "email",
    "password",
    "confirm_password",
    "passportNumber",
    "passportIssuedDate",
    "passport_expiry_date",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = "This field is required.";
    }
  });

  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email address.";
  }

  if (formData.password && formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (formData.password !== formData.confirm_password) {
    errors.confirm_password = "Passwords do not match.";
  }

  const phonePattern = /^[0-9]+$/;
  if (formData.mobile && !phonePattern.test(formData.mobile)) {
    errors.mobile = "Invalid mobile number.";
  }
  if (
    formData.mobileDuringTravel &&
    !phonePattern.test(formData.mobileDuringTravel)
  ) {
    errors.mobileDuringTravel = "Invalid mobile number during travel.";
  }

  if (formData.passportIssuedDate && formData.passport_expiry_date) {
    const issuedDate = new Date(formData.passportIssuedDate);
    const expiryDate = new Date(formData.passport_expiry_date);

    if (expiryDate <= issuedDate) {
      errors.passport_expiry_date =
        "Expiry date must be after the issued date.";
    }
  }

  return errors;
};
