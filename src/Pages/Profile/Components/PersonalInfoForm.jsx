import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
} from "../../../Redux/ApiSlices/profileSlice.js";
import TextInput from "../../../Components/Fields/TextInput.jsx";
import DateInput from "../../../Components/Fields/DateInput.jsx";
import PhoneInputComponent from "../../../Components/Fields/PhoneInputComponent.jsx";
import ReactFlagsSelect from "react-flags-select";
import { validatePersonalInfo } from "../validation.js";
import { countryList } from "../Countries/countryList.js";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";
import Toast from "../Toast/Toast.jsx";
import Button from "../../../Components/Button/Button.jsx";
import "../Profile.css";

const PersonalInfoForm = ({ editMode, toggleEditMode }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    country_of_residence: "",
    phone: "",
    mobile_during_travel: "",
    email: "",
    image: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const API_BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData((prevData) => ({
        ...prevData,
        title: profile.passenger?.travel_requirement?.title ?? "",
        first_name: profile.passenger?.travel_requirement?.first_name ?? "",
        last_name: profile.passenger?.travel_requirement?.last_name ?? "",
        age: profile.passenger?.travel_requirement?.age?.toString() ?? "",
        date_of_birth:
          profile.passenger?.travel_requirement?.date_of_birth ?? "",
        gender: profile.passenger?.travel_requirement?.gender ?? "",
        nationality: profile.passenger?.travel_requirement?.nationality ?? "",
        address: profile.passenger?.travel_requirement?.address ?? "",
        city: profile.passenger?.travel_requirement?.city ?? "",
        country_of_residence:
          profile.passenger?.travel_requirement?.country_of_residence ?? "",
        phone: profile.phone ?? "",
        mobile_during_travel:
          profile.passenger?.travel_requirement?.mobile_during_travel ?? "",
        email: profile.email ?? "",
        image: profile.image ?? "",
      }));
      setProfileImagePreview(
        // profile.image ? `${API_BASE_URL}/${profile.image}` : null
        profile.image ? `${profile.image}` : null
      );
    }
  }, [profile]);

  const getSelectedCountryCode = (countryName) => {
    const entry = countryList.find(({ name }) => name === countryName);
    return entry ? entry.code : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (name, phone) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: phone,
    }));
  };

  const handleCountryChange = (countryCode) => {
    const selectedCountry =
      countryList.find(({ code }) => code === countryCode)?.name || "";
    setFormData((prevData) => ({
      ...prevData,
      country_of_residence: selectedCountry,
    }));
  };

  const handleNationalityChange = (countryCode) => {
    const selectedCountry =
      countryList.find(({ code }) => code === countryCode)?.name || "";
    setFormData((prevData) => ({
      ...prevData,
      nationality: selectedCountry,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePersonalInfo(formData);
    console.log("Validation Errors:", validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      dispatch(updateProfile({ profile: formData, profileImage }))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          setToast({
            message: "Profile updated successfully!",
            type: "success",
          });
          if (typeof toggleEditMode === "function") {
            toggleEditMode(false);
          } else {
            console.error("toggleEditMode is not a function");
          }
        })
        .catch((error) => {
          console.error("Update Failed:", error);
          setIsLoading(false);
          setToast({
            message: error.message || "Update failed. Please try again.",
            type: "error",
          });
          setErrors(error.errors || { general: error.message });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile image section */}
      <div className="flex items-center justify-center space-x-6">
        <div className="relative group">
          {profileImagePreview ? (
            <img
              src={profileImagePreview}
              alt="Profile"
              className="w-36 h-36 rounded-full shadow-2xl object-cover border-4 border-white group-hover:border-blue-500 transition duration-300 ease-in-out"
            />
          ) : profile?.image ? (
            <img
              // src={`${API_BASE_URL}/${profile.image}`}
              src={profile.image}
              alt="Profile"
              className="w-36 h-36 rounded-full shadow-2xl object-cover border-4 border-white group-hover:border-blue-500 transition duration-300 ease-in-out"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              Add Photo
            </div>
          )}
          {editMode && (
            <>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                <i className="fas fa-camera text-white text-lg"></i>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
              />
            </>
          )}
        </div>
      </div>

      {/* Personal Information form fields */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <LoadingSpinner />
          </div>
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="w-full">
            <label htmlFor="title" className="text-gray-700">
              Title
            </label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={!editMode}
              className={`input-field rounded-md h-11 mt-4 border-gray-300 focus:border-blue-600 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none ${
                errors.title ? "unfamiliar-animation" : ""
              }`}
            >
              <option value="Select" disabled>
                Select
              </option>
              <option value="Miss">Miss.</option>
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Ms">Ms.</option>
            </select>
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <TextInput
            label="First Name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.first_name}
          />
          <TextInput
            label="Last Name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.last_name}
          />
          <div className="w-full">
            <label htmlFor="date_of_birth" className="text-black text-sm">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              disabled={!editMode}
              value={formData.date_of_birth || ""}
              onChange={handleInputDateChange}
              max={new Date().toISOString().split("T")[0]}
              className="input-field rounded-md mt-4"
            />
          </div>
          <TextInput
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            disabled={true}
          />
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-black"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!editMode}
              className="block w-full px-3 py-2 mt-5 border disabled:cursor-auto border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer transition ease-in-out duration-150"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
          <div className="text-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nationality
            </label>
            <ReactFlagsSelect
              searchPlaceholder="Select Nationality"
              selected={getSelectedCountryCode(formData.nationality)}
              onSelect={handleNationalityChange}
              searchable
              name="nationality"
              disabled={!editMode}
              className="w-full mt-5 text-black"
              id="nationality"
            />
            {errors.nationality && (
              <p className="text-red-500 text-sm">{errors.nationality}</p>
            )}
          </div>
          <TextInput
            label="Address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.address}
          />
          <TextInput
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.city}
          />
          <div className="text-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country Of Residence
            </label>
            <ReactFlagsSelect
              searchPlaceholder="Search countries"
              selected={getSelectedCountryCode(formData.country_of_residence)}
              onSelect={handleCountryChange}
              searchable
              name="country_of_residence"
              disabled={!editMode}
              className="w-full mt-5 text-black custom-flags-select input-placeholder"
              id="country_of_residence"
            />
            {errors.country_of_residence && (
              <p className="text-red-500 text-sm">
                {errors.country_of_residence}
              </p>
            )}
          </div>
          <PhoneInputComponent
            label="Mobile"
            name="phone"
            value={formData.phone}
            onChange={(phone) => handlePhoneChange("phone", phone)}
            disabled={!editMode}
            error={errors.phone}
          />
          <PhoneInputComponent
            label="Mobile During Travel"
            name="mobile_during_travel"
            value={formData.mobile_during_travel}
            onChange={(phone) =>
              handlePhoneChange("mobile_during_travel", phone)
            }
            disabled={!editMode}
            error={errors.mobile_during_travel}
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.email}
          />
        </div>
        {/* {!buttonHidden && editMode && (
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 transition duration-300"
            disabled={isLoading}
          >
            Save Changes
          </button>
        )} */}
        {!buttonHidden && editMode && (
          <div className="relative flex justify-center items-center">
            <Button
              type="submit"
              color={"#00529B"}
              padding="12px"
              width="100%"
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </form>
  );
};

PersonalInfoForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};

export default PersonalInfoForm;
