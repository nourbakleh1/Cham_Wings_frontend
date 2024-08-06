export const validate = (values) => {
  const errors = {};

  if (!values.title) errors.title = "Title is Required";
  if (!values.first_name) errors.first_name = "First Name is Required";
  if (!values.last_name) errors.last_name = "Last Name is Required";
  if (!values.email) errors.email = "Email is Required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
    errors.email = "Invalid email address";
  if (!values.password) errors.password = "Passwords is Required";
  if (values.password !== values.confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (!values.date_of_birth) errors.date_of_birth = "Required";
  if (!values.country) errors.country = "Country is Required";
  if (!values.mobile) errors.mobile = "Mobile is Required";
  return errors;
};
