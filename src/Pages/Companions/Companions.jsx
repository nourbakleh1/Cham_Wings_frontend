import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-collapse";
import axios from "axios"; // Import axios for API calls
import {
  fetchProfile,
  updateProfile,
} from "../../Redux/features/profile/profileSlice.js";
import TextInput from "../../Components/Fields/TextInput.jsx";
import DateInput from "../../Components/Fields/DateInput.jsx";
import PhoneInputComponent from "../../Components/Fields/PhoneInputComponent.jsx";
import ReactFlagsSelect from "react-flags-select";

const ReadOnlyInput = ({ label, value, className }) => (
  <TextInput label={label} value={value} disabled className={className} />
);

const CompanionAccordion = ({ companion, index, onChange }) => (
  <div className="mb-4 border-b border-gray-400 pb-4">
    <h2 className="text-xl font-bold mb-4 text-secoundary_color">
      Companion {index + 1}
    </h2>
    <div className="grid gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <TextInput
        label="First Name"
        value={companion.firstName}
        onChange={(e) => onChange(index, "firstName", e.target.value)}
        className="w-full"
      />
      <TextInput
        label="Last Name"
        value={companion.lastName}
        onChange={(e) => onChange(index, "lastName", e.target.value)}
        className="w-full"
      />
      <DateInput
        label="Date of Birth"
        selected={companion.dateOfBirth}
        onChange={(date) => onChange(index, "dateOfBirth", date)}
        className="w-full"
      />
      <div className="w-full">
        <label className="block text-sm font-medium text-black">Gender</label>
        <select
          value={companion.gender}
          onChange={(e) => onChange(index, "gender", e.target.value)}
          className="block w-full px-3 py-2 mt-5 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="text-sm w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nationality
        </label>
        <ReactFlagsSelect
          searchPlaceholder="select Nationality"
          searchable
          selected={companion.nationality}
          onSelect={(country) => onChange(index, "nationality", country)}
          className="w-full mt-5 text-black"
        />
      </div>
      <TextInput
        label="Address"
        value={companion.address}
        onChange={(e) => onChange(index, "address", e.target.value)}
        className="w-full"
      />
      <TextInput
        label="City"
        value={companion.city}
        onChange={(e) => onChange(index, "city", e.target.value)}
        className="w-full"
      />
      <div className="text-sm w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country Of Residence
        </label>
        <ReactFlagsSelect
          searchPlaceholder="Search countries"
          searchable
          selected={companion.countryOfResidence}
          onSelect={(country) => onChange(index, "countryOfResidence", country)}
          className="w-full mt-5 text-black"
        />
      </div>
      <PhoneInputComponent
        label="Mobile"
        value={companion.mobile}
        onChange={(e) => onChange(index, "mobile", e.target.value)}
        className="w-full"
      />
      <PhoneInputComponent
        label="Mobile During Travel"
        value={companion.mobileDuringTravel}
        onChange={(e) => onChange(index, "mobileDuringTravel", e.target.value)}
        className="w-full"
      />
      <TextInput
        label="Email"
        value={companion.email}
        onChange={(e) => onChange(index, "email", e.target.value)}
        className="w-full"
      />
      <TextInput
        label="Passport Number"
        value={companion.passportNumber}
        onChange={(e) => onChange(index, "passportNumber", e.target.value)}
        className="w-full"
      />
      <DateInput
        label="Passport Issued Date"
        selected={companion.passportIssuedDate}
        onChange={(date) => onChange(index, "passportIssuedDate", date)}
        className="w-full"
      />
      <DateInput
        label="Passport Expiry Date"
        selected={companion.passportExpiryDate}
        minDate={
          companion.passportIssuedDate
            ? new Date(companion.passportIssuedDate)
            : null
        }
        onChange={(date) => onChange(index, "passportExpiryDate", date)}
        className="w-full"
      />
    </div>
  </div>
);

const Companions = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    countryOfResidence: "",
    mobile: "",
    mobileDuringTravel: "",
    email: "",
    passportNumber: "",
    passportIssuedDate: "",
    passportExpiryDate: "",
    passportImage: "",
  });

  const [companions, setCompanions] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProfileData = () => {
      setFormData({
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        gender: "male",
        nationality: "US",
        address: "123 Main St",
        city: "Anytown",
        countryOfResidence: "US",
        mobile: "+1234567890",
        mobileDuringTravel: "+0987654321",
        email: "john.doe@example.com",
        passportNumber: "123456789",
        passportIssuedDate: "2015-01-01",
        passportExpiryDate: "2025-01-01",
      });
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchCompanionsData = () => {
      setCompanions([
        {
          firstName: "Jane",
          lastName: "Doe",
          dateOfBirth: "1992-02-02",
          gender: "female",
          nationality: "US",
          address: "456 Oak St",
          city: "Somewhere",
          countryOfResidence: "US",
          mobile: "+1234567891",
          mobileDuringTravel: "+0987654322",
          passportNumber: "987654321",
          passportIssuedDate: "2016-02-01",
          passportExpiryDate: "2026-02-01",
        },
        {
          firstName: "Sam",
          lastName: "Smith",
          dateOfBirth: "1988-03-03",
          gender: "male",
          nationality: "US",
          address: "789 Pine St",
          city: "Anywhere",
          countryOfResidence: "US",
          mobile: "+1234567892",
          mobileDuringTravel: "+0987654323",
          passportNumber: "192837465",
          passportIssuedDate: "2017-03-01",
          passportExpiryDate: "2027-03-01",
        },
      ]);
    };

    fetchCompanionsData();
  }, []);

  const handleAccordionToggle = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleCompanionChange = (index, field, value) => {
    const updatedCompanions = companions.map((companion, i) =>
      i === index ? { ...companion, [field]: value } : companion
    );
    setCompanions(updatedCompanions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {}; // Add your validation logic here
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("/api/submitProfile", { formData, companions });
        // Optionally handle response or redirect
      } catch (error) {
        console.error("Error submitting profile:", error);
        // Optionally handle error state
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-50 py-2 min-h-screen flex flex-col">
      <div className="flex-grow mx-auto sm:p-2 md:p-2 my-8 bg-white rounded-lg shadow-md w-full max-w-screen-md sm:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
        <h1 className="md:text-3xl xs:text-xl font-bold mb-8 py-4 xs:pt-16 text-center border-b-2 border-gray-300">
          Enter Passenger Details
        </h1>
        <div className="mt-0 mb-8 bg-white rounded-lg shadow-lg w-full max-w-screen-md sm:max-w-3xl lg:max-w-4xl xl:max-w-6xl overflow-hidden">
          <h1 className="w-full p-4 md:text-xl xs:text-sm text-left bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg">
            Passenger Information
          </h1>
          <div className="md:p-6 xs:p-2 space-y-6">
            <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <ReadOnlyInput
                label="First Name"
                value={formData.firstName}
                className="w-full"
              />
              <ReadOnlyInput
                label="Last Name"
                value={formData.lastName}
                className="w-full"
              />
              <DateInput
                label="Date of Birth"
                selected={formData.dateOfBirth}
                disabled
                className="w-full"
              />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  disabled
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <ReactFlagsSelect
                  searchPlaceholder="Select Nationality"
                  selected={formData.nationality}
                  disabled
                  className="w-full text-gray-700 bg-gray-100"
                />
              </div>
              <ReadOnlyInput
                label="Address"
                value={formData.address}
                className="w-full"
              />
            </div>
            <Collapse isOpened={isOpen}>
              <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <ReadOnlyInput
                  label="City"
                  value={formData.city}
                  className="w-full"
                />
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Country Of Residence
                  </label>
                  <ReactFlagsSelect
                    searchPlaceholder="Search countries"
                    selected={formData.countryOfResidence}
                    disabled
                    className="w-full text-gray-700 bg-gray-100"
                  />
                </div>
                <PhoneInputComponent
                  label="Mobile"
                  value={formData.mobile}
                  disabled
                  className="w-full"
                />
                <PhoneInputComponent
                  label="Mobile During Travel"
                  value={formData.mobileDuringTravel}
                  disabled
                  className="w-full"
                />
                <ReadOnlyInput
                  label="Email"
                  value={formData.email}
                  className="w-full"
                />
                <ReadOnlyInput
                  label="Passport Number"
                  value={formData.passportNumber}
                  className="w-full"
                />
                <DateInput
                  label="Passport Issued Date"
                  selected={formData.passportIssuedDate}
                  disabled
                  className="w-full"
                />
                <DateInput
                  label="Passport Expiry Date"
                  selected={formData.passportExpiryDate}
                  minDate={
                    formData.passportIssuedDate
                      ? new Date(formData.passportIssuedDate)
                      : null
                  }
                  disabled
                  className="w-full"
                />
              </div>
            </Collapse>
            <button
              className="text-left w-full p-2 hover:bg-gray-200 hover:rounded-lg focus:outline-none text-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "Show Less" : "Read More"}
              <svg
                className={`inline-block h-5 w-5 ml-2 transform transition-transform duration-200 ${
                  activeAccordion === "companions" ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Companions Information Accordion */}
          <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <button
              type="button"
              onClick={() => handleAccordionToggle("companions")}
              className="w-full px-4 py-4 text-left bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold focus:outline-none flex justify-between items-center"
            >
              <h1 className="md:text-xl xs:text-sm">Companions Information</h1>
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  activeAccordion === "companions" ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {activeAccordion === "companions" && (
              <div className="p-4 bg-gray-50">
                {companions.map((companion, index) => (
                  <CompanionAccordion
                    key={index}
                    companion={companion}
                    index={index}
                    onChange={handleCompanionChange}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="md:px-8 md:py-3 xs:px-2 xs:py-2 xs:mb-8 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Companions;
