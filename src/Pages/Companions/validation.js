const validateCompanion = (companion) => {
  let errors = {};

  if (!companion.firstName) {
    errors.firstName = "First name is required";
  }

  if (!companion.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!companion.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  }

  if (!companion.gender) {
    errors.gender = "Gender is required";
  }

  if (!companion.nationality) {
    errors.nationality = "Nationality is required";
  }

  if (!companion.address) {
    errors.address = "Address is required";
  }

  if (!companion.city) {
    errors.city = "City is required";
  }

  if (!companion.countryOfResidence) {
    errors.countryOfResidence = "Country of residence is required";
  }

  if (!companion.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\+?[1-9]\d{1,14}$/.test(companion.mobile)) {
    errors.mobile = "Invalid mobile number";
  }

  if (!companion.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(companion.email)) {
    errors.email = "Invalid email address";
  }

  if (!companion.passportNumber) {
    errors.passportNumber = "Passport number is required";
  }

  if (!companion.passportIssuedDate) {
    errors.passportIssuedDate = "Passport issued date is required";
  }

  if (!companion.passportExpiryDate) {
    errors.passportExpiryDate = "Passport expiry date is required";
  }

  return errors;
};

export default validateCompanion;
