import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { validationSchema } from "./validationSchema";
import { Link } from "react-router-dom";
import "../Register/style.css";

const Login = () => {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:3000/login", values);
      setFormStatus("Login successful!");
      // Handle navigation or state update after successful login
    } catch (error) {
      setFormStatus("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="h-dvh md:w-full lg:w-1/2 bg-primary_color py-32 px-6 md:px-24 space-y-1.5 flex flex-col justify-center">
        <h1 className="xs:text-2xl md:text-3xl font-bold text-white md:mb-6 sm:mb-6 xs:pb-4 md:pb-0">
          Login to Cham Wings
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4 lg:flex-row lg:space-x-4">
                <div className="w-full lg:w-2/3">
                  <label htmlFor="email" className="text-white">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`input-field shadow-md rounded-md ${
                      errors.email && touched.email
                        ? "unfamiliar-animation"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-blue-900 font-semibold mt-1"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full lg:w-2/3">
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
                    className="text-blue-900 font-semibold mt-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full md:w-1/3 bg-primary_color hover:bg-primary_color_1 text-white border-2 border-white xs:px-4 xs:py-1 md:px-8 md:py-2 rounded-lg shadow-md transition duration-300 ease-in-out ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg"
                }`}
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        {formStatus && <div className="text-red-600 mt-4">{formStatus}</div>}
        <div className="mt-4 pt-4 text-white">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 underline">
            Register now
          </Link>
        </div>
      </div>

      {/* Right Side - Logo */}
      <div className="lg:w-1/2 justify-center items-center hidden sm:block bg-center bg-login-image bg-no-repeat bg-gray-300"></div>
    </div>
  );
};

export default Login;
