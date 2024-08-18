export const validatePersonalInfo = (formData) => {
  let errors = {};

  if (!formData.title) errors.title = "Title is required";
  if (!formData.first_name) errors.first_name = "First name is required";
  if (!formData.last_name) errors.last_name = "Last name is required";
  if (!formData.date_of_birth)
    errors.date_of_birth = "Date of birth is required";
  if (!formData.gender) errors.gender = "Gender is required";
  if (!formData.nationality) errors.nationality = "Nationality is required";
  if (!formData.address) errors.address = "Address is required";
  if (!formData.city) errors.city = "City is required";
  if (!formData.country_of_residence)
    errors.country_of_residence = "Country of residence is required";
  if (!formData.phone) errors.phone = "Phone number is required";
  if (!formData.email) errors.email = "Email is required";

  return errors; // Add this line to return the errors object
};

export const validateProfileForm = (data) => {
  const errors = {};

  if (!data.number) {
    errors.number = "Passport number is required.";
  }
  if (!data.passport_issued_country) {
    errors.passport_issued_country = "Passport issued country is required.";
  }
  if (!data.passport_issued_date) {
    errors.passport_issued_date = "Passport issued date is required.";
  }
  if (!data.passport_expiry_date) {
    errors.passport_expiry_date = "Passport expiry date is required.";
  }
  if (!data.passport_image) {
    errors.passport_image = "Passport image is required.";
  }

  return errors;
};
