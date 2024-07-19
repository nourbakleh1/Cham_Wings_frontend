export const validateProfileForm = (formData) => {
  const errors = {};

  const requiredFields = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "gender",
    "nationality",
    "address",
    "city",
    "countryOfResidence",
    "mobile",
    "email",
    "password",
    "confirmPassword",
    "passportNumber",
    "passportIssuedDate",
    "passportExpiryDate",
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

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
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

  if (formData.passportIssuedDate && formData.passportExpiryDate) {
    const issuedDate = new Date(formData.passportIssuedDate);
    const expiryDate = new Date(formData.passportExpiryDate);

    if (expiryDate <= issuedDate) {
      errors.passportExpiryDate = "Expiry date must be after the issued date.";
    }
  }

  return errors;
};
