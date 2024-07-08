import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  resetForm,
} from "../../../Redux/ApiSlices/registerFormSlice.js";
import { useFormik } from "formik";
import validationSchema from "./validationSchema.js";
import countryCodes from "./countryCodes";
import countries from "./countries";

const Register = () => {
  const dispatch = useDispatch();
  const registerForm = useSelector((state) => state.register);

  const formik = useFormik({
    initialValues: {
      title: registerForm.title || "",
      firstName: registerForm.firstName || "",
      lastName: registerForm.lastName || "",
      email: registerForm.email || "",
      password: "",
      confirmPassword: "",
      dob: registerForm.dob || "",
      country: registerForm.country || "",
      // language: registerForm.language || "",
      countryCode: registerForm.countryCode || "",
      mobile: registerForm.mobile || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission , dispatch action / API call
      console.log("Submitting form:", values);
      dispatch(resetForm());
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-2 sm:px-4 lg:px-8 bg-register-image">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white px-4 sm:p-8 rounded-lg shadow-xl border-primary_color border-2 min-h-[600px]">
          <div className="sm:block hidden bg-primary_color border-primary_color border-2 py-4 rounded-t-lg">
            <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">
              Join Cham Wings
            </h2>
          </div>
          <form className="mt-4 py-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <select
                    name="title"
                    id="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.title && formik.errors.title
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                  >
                    <option value="">Titles</option>
                    <option value="Miss">Miss</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                  </select>
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.title}
                    </p>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.firstName && formik.errors.firstName
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                    placeholder="First Name"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.lastName && formik.errors.lastName
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                    placeholder="Last Name"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-black text-xs mb-4">
                Your name must be entered in English as it appears on your
                passport.
              </p>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                      : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                  }
                  placeholder="Email@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                    placeholder="Confirm Password"
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.dob && formik.errors.dob
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                  />
                  {formik.touched.dob && formik.errors.dob && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.dob}
                    </p>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country/Territory of Residence
                  </label>
                  <select
                    name="country"
                    id="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.country && formik.errors.country
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {formik.touched.country && formik.errors.country && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.country}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                {/* <div className="w-full sm:w-1/4">
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Preferred Language
                  </label>
                  <select
                    name="language"
                    id="language"
                    value={formik.values.language}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.language && formik.errors.language
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                  >
                    <option value="">Preferred Language</option>
                    <option value="English">English</option>
                    <option value="Arabic">عربي</option>
                  </select>
                  {formik.touched.language && formik.errors.language && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.language}
                    </p>
                  )}
                </div> */}
                <div className="w-full sm:w-1/3">
                  <label
                    htmlFor="countryCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country Code
                  </label>
                  <select
                    name="countryCode"
                    id="countryCode"
                    value={formik.values.countryCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.countryCode && formik.errors.countryCode
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                  >
                    <option value="">Code</option>
                    {countryCodes.map((code) => (
                      <option key={code.code} value={code.code}>
                        {code.name} ({code.code})
                      </option>
                    ))}
                  </select>
                  {formik.touched.countryCode && formik.errors.countryCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.countryCode}
                    </p>
                  )}
                </div>
                <div className="w-full sm:w-2/3">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.mobile && formik.errors.mobile
                        ? "mt-1 block w-full px-3 py-4 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                        : "mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary_color focus:border-primary_color sm:text-sm"
                    }
                    placeholder="Mobile Number"
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.mobile}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary_color hover:bg-primary_color_1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary_color_1"
              >
                Create An Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
