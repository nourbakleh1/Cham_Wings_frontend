import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  dob: Yup.string().required("Date of Birth is required"),
  country: Yup.string().required("Country/Territory of Residence is required"),
  // language: Yup.string().required("Preferred Language is required"),
  countryCode: Yup.string().required("Country Code is required"),
  mobile: Yup.string().required("Mobile Number is required"),
});

export default validationSchema;
