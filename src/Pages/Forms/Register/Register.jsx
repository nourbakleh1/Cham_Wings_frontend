import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactFlagsSelect from "react-flags-select";
import { validationSchema } from "./validationSchema";
import "./style.css";

const RegisterPage = () => {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        values
      );
      setFormStatus("Registration successful!");
      resetForm();
    } catch (error) {
      console.error("Registration error:", error);
      setFormStatus("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <div className="lg:w-1/2 bg-primary_color py-32 px-6 md:px-24 flex flex-col justify-center">
        <h1 className="md:text-3xl xs:text-2xl font-bold text-white mb-6 text-center">
          Join Cham Wings
        </h1>
        <Formik
          initialValues={{
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
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4 lg:flex-row lg:space-x-4">
                <div className="w-full md:w-1/3">
                  <label htmlFor="title" className="text-white">
                    Title
                  </label>
                  <Field
                    as="select"
                    id="title"
                    name="title"
                    className={`input-field shadow-md rounded-md ${
                      errors.title && touched.title
                        ? "unfamiliar-animation"
                        : ""
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Miss">Miss.</option>
                    <option value="Mr">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Ms">Ms.</option>
                  </Field>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <label htmlFor="first_name" className="text-white">
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="first_name"
                    name="first_name"
                    className={`input-field shadow-md rounded-md ${
                      errors.first_name && touched.first_name
                        ? "unfamiliar-animation"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <label htmlFor="last_name" className="text-white">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="last_name"
                    name="last_name"
                    className={`input-field shadow-md rounded-md ${
                      errors.last_name && touched.last_name
                        ? "unfamiliar-animation"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`input-field shadow-md rounded-md ${
                    errors.email && touched.email ? "unfamiliar-animation" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="password" className="text-white">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={`input-field shadow-md rounded-md ${
                      errors.password && touched.password
                        ? "unfamiliar-animation"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="confirmPassword" className="text-white">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`input-field shadow-md rounded-md ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "unfamiliar-animation"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="date_of_birth" className="text-white">
                    Date of Birth
                  </label>
                  <Field
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    className={`input-field shadow-md rounded-md ${
                      errors.date_of_birth && touched.date_of_birth
                        ? "unfamiliar-animation"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="date_of_birth"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="country" className="text-white">
                    Country of Residence
                  </label>

                  <ReactFlagsSelect
                    id="country"
                    name="country"
                    selected={values.country}
                    onSelect={(code) => setFieldValue("country", code)}
                    searchable
                    selectButtonClassName={`custom-select-button ${
                      errors.country && touched.country
                        ? "unfamiliar-animation"
                        : ""
                    }`}
                  />

                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="mobile" className="text-white">
                  Mobile
                </label>
                <Field
                  as={PhoneInput}
                  country={values.country_code || "sy"}
                  value={values.mobile}
                  onChange={(value) => setFieldValue("mobile", value)}
                  inputProps={{
                    name: "mobile",
                    id: "mobile",
                    required: true,
                    className: `input-field shadow-md rounded-md ${
                      errors.mobile && touched.mobile
                        ? "unfamiliar-animation"
                        : ""
                    }`,
                    style: { paddingLeft: "46px" },
                    placeholder: "",
                  }}
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className={`w-full lg:w-full xl:w-auto bg-primary_color hover:bg-primary_color_1 text-white border-2 border-white xs:px-4 xs:py-1 md:px-8 md:py-2 rounded-lg shadow-md transition duration-300 ease-in-out ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg"
                }`}
                disabled={isSubmitting}
              >
                Create An Account
              </button>
            </Form>
          )}
        </Formik>
        {formStatus && <div className="text-white mt-4">{formStatus}</div>}
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
