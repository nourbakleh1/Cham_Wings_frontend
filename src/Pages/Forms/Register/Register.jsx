import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactFlagsSelect from "react-flags-select";
import { validate } from "./validationSchema";
import "./style.css";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    date_of_birth: "",
    country: "",
    country_code: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectCountry = (code) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      country: code,
      country_code: code,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      mobile: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form Values:", formValues);

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formValues
      );

      console.log("Backend Response Status:", response.status);
      console.log("Backend Response Data:", response.data);

      setFormStatus("Registration successful!");
      setSubmittedData(response.data);
      setFormValues({
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        date_of_birth: "",
        country: "",
        country_code: "",
        mobile: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setFormStatus("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <div className="lg:w-1/2 bg-primary_color py-32 px-6 md:px-24 flex flex-col justify-center">
        <h1 className="md:text-3xl xs:text-2xl font-bold text-white mb-6 text-center">
          Join Cham Wings
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <div className="flex flex-col md:flex-row md:space-x-4 lg:flex-row lg:space-x-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="title" className="text-white">
                Title
              </label>
              <select
                id="title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                className={`input-field shadow-md rounded-md ${
                  errors.title ? "unfamiliar-animation" : ""
                }`}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Miss">Miss.</option>
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Ms">Ms.</option>
              </select>
              {errors.title && (
                <div className="text-blue-900 font-semibold mt-1">
                  {errors.title}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/3">
              <label htmlFor="first_name" className="text-white">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formValues.first_name}
                onChange={handleChange}
                className={`input-field shadow-md rounded-md ${
                  errors.first_name ? "unfamiliar-animation" : ""
                }`}
              />
              {errors.first_name && (
                <div className="text-blue-900 font-semibold mt-1">
                  {errors.first_name}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/3">
              <label htmlFor="last_name" className="text-white">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formValues.last_name}
                onChange={handleChange}
                className={`input-field shadow-md rounded-md ${
                  errors.last_name ? "unfamiliar-animation" : ""
                }`}
              />
              {errors.last_name && (
                <div className="text-blue-900 font-semibold mt-1">
                  {errors.last_name}
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className={`input-field shadow-md rounded-md ${
                errors.email ? "unfamiliar-animation" : ""
              }`}
            />
            {errors.email && (
              <div className="text-blue-900 font-semibold mt-1">
                {errors.email}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className={`input-field shadow-md rounded-md ${
                  errors.password ? "unfamiliar-animation" : ""
                }`}
              />
              {errors.password && (
                <div className="text-blue-900 font-semibold mt-1">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                className={`input-field shadow-md rounded-md ${
                  errors.confirmPassword ? "unfamiliar-animation" : ""
                }`}
              />
              {errors.confirmPassword && (
                <div className="text-blue-900 font-semibold mt-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="date_of_birth" className="text-white">
                Date of Birth
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formValues.date_of_birth}
                onChange={handleChange}
                className={`input-field shadow-md rounded-md ${
                  errors.date_of_birth ? "unfamiliar-animation" : ""
                }`}
              />
              {errors.date_of_birth && (
                <div className="text-blue-900 font-semibold mt-1">
                  {errors.date_of_birth}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="country" className="text-white">
                Country of Residence
              </label>
              <ReactFlagsSelect
                id="country"
                name="country"
                selected={formValues.country}
                onSelect={handleSelectCountry}
                searchable
                selectButtonClassName={`custom-select-button ${
                  errors.country ? "unfamiliar-animation" : ""
                }`}
              />
              {errors.country && (
                <div className="text-blue-900 font-semibold mt-1">
                  {errors.country}
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="mobile" className="text-white">
              Mobile
            </label>
            <PhoneInput
              country={formValues.country_code || "sy"}
              value={formValues.mobile}
              onChange={handlePhoneChange}
              inputProps={{
                name: "mobile",
                id: "mobile",
                required: true,
                className: `input-field shadow-md rounded-md ${
                  errors.mobile ? "unfamiliar-animation" : ""
                }`,
                style: { paddingLeft: "46px" },
                placeholder: "",
              }}
            />
            {errors.mobile && (
              <div className="text-blue-900 font-semibold mt-1">
                {errors.mobile}
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`w-full lg:w-full xl:w-auto bg-primary_color hover:bg-primary_color_1 text-white border-2 border-white xs:px-4 xs:py-1 md:px-8 md:py-2 rounded-lg shadow-md transition duration-300 ease-in-out ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
            }`}
            disabled={isSubmitting}
          >
            Create An Account
          </button>
        </form>
        {formStatus && <div className="text-white mt-4">{formStatus}</div>}
        {submittedData && (
          <div className="text-white mt-4">
            <h2 className="text-xl font-bold">Submitted Data:</h2>
            <pre className="bg-gray-700 p-4 rounded-lg">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
        <div className="mt-4 text-white">
          You already have an account?{" "}
          <Link to="/login" className="text-blue-700 underline">
            Login
          </Link>
        </div>
      </div>

      <div className="lg:w-1/2 justify-center items-center hidden sm:block bg-center bg-register-image bg-no-repeat bg-gray-300"></div>
    </div>
  );
};

export default RegisterPage;
