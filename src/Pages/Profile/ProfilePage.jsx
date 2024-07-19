import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
} from "../../Redux/features/profile/profileSlice.js";
import TextInput from "./Components/TextInput";
import DateInput from "./Components/DateInput";
import PhoneInputComponent from "./Components/PhoneInputComponent";
import ReactFlagsSelect from "react-flags-select";
import { validateProfileForm } from "./validation";

const ProfilePage = () => {
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
    password: "",
    confirmPassword: "",
    passportNumber: "",
    passportIssuedDate: "",
    passportExpiryDate: "",
    passportImage: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const passportIssuedDate = formData.passportIssuedDate
    ? new Date(formData.passportIssuedDate)
    : null;
  const minExpiryDate = passportIssuedDate ? passportIssuedDate : null;

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        dateOfBirth: profile.dateOfBirth || "",
        gender: profile.gender || "",
        nationality: profile.nationality || "",
        address: profile.address || "",
        city: profile.city || "",
        countryOfResidence: profile.countryOfResidence || "",
        mobile: profile.mobile || "",
        mobileDuringTravel: profile.mobileDuringTravel || "",
        email: profile.email || "",
        password: profile.password || "",
        confirmPassword: profile.confirmPassword || "",
        passportNumber: profile.passportNumber || "",
        passportIssuedDate: profile.passportIssuedDate || "",
        passportExpiryDate: profile.passportExpiryDate || "",
        passportImage: profile.passportImage || "",
      });
    }
  }, [profile]);

  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handlePhoneChange = (name, phone) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: phone,
    }));
  };

  const handleCountryChange = (country) => {
    setFormData((prevData) => ({
      ...prevData,
      countryOfResidence: country,
    }));
  };

  const handleNationalityChange = (country) => {
    setFormData((prevData) => ({
      ...prevData,
      nationality: country,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          passportImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateProfileForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateProfile(formData));
      setEditMode(false);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-50 py-2">
      <div className="max-w-7xl mx-auto p-8 mt-8 mb-16 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 pt-8 text-center border-b-2 border-gray-300 py-4">
          Profile Information
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={toggleEditMode}
              className="ml-auto text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              <i className={`fas ${editMode ? "fa-times" : "fa-edit"}`}></i>
              {editMode ? " Cancel" : " Edit"}
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-8">
              Personal Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName || ""}
                onChange={handleChange}
                disabled={!editMode}
                error={errors.firstName}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!editMode}
                error={errors.lastName}
              />
              <DateInput
                label="Date of Birth"
                name="dateOfBirth"
                type="dateOfBirth"
                selected={formData.dateOfBirth}
                onChange={(date) => handleDateChange("dateOfBirth", date)}
                disabled={!editMode}
                error={errors.dateOfBirth}
              />
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
                  value={formData.gender || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="block w-full px-3 py-2 mt-5 border disabled:cursor-auto border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer transition ease-in-out duration-150"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
                  searchPlaceholder="select Nationality"
                  selected={formData.nationality}
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
                  selected={formData.countryOfResidence}
                  onSelect={handleCountryChange}
                  searchable
                  name="CountryOfResidence"
                  disabled={!editMode}
                  className="w-full mt-5 text-black"
                  id="countryOfResidence"
                />
                {errors.countryOfResidence && (
                  <p className="text-red-500 text-sm">
                    {errors.countryOfResidence}
                  </p>
                )}
              </div>
              <PhoneInputComponent
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={(phone) => handlePhoneChange("mobile", phone)}
                disabled={!editMode}
                error={errors.mobile}
              />
              <PhoneInputComponent
                label="Mobile During Travel"
                name="mobileDuringTravel"
                value={formData.mobileDuringTravel}
                onChange={(phone) =>
                  handlePhoneChange("mobileDuringTravel", phone)
                }
                disabled={!editMode}
                error={errors.mobileDuringTravel}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-8">
              Security Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
                error={errors.email}
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={!editMode}
                error={errors.password}
              />
              <TextInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={!editMode}
                error={errors.confirmPassword}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-8">
              Passport Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                label="Passport Number"
                name="passportNumber"
                type="number"
                value={formData.passportNumber}
                onChange={handleChange}
                disabled={!editMode}
                error={errors.passportNumber}
              />
              <DateInput
                label="Passport Issued Date"
                name="passportIssuedDate"
                type="event"
                selected={formData.passportIssuedDate}
                onChange={(date) =>
                  handleDateChange("passportIssuedDate", date)
                }
                disabled={!editMode}
                error={errors.passportIssuedDate}
              />
              <DateInput
                label="Passport Expiry Date"
                name="passportExpiryDate"
                type="event"
                selected={formData.passportExpiryDate}
                minDate={
                  formData.passportIssuedDate
                    ? new Date(formData.passportIssuedDate)
                    : minExpiryDate
                }
                onChange={(date) =>
                  handleDateChange("passportExpiryDate", date)
                }
                disabled={!editMode}
                error={errors.passportExpiryDate}
              />
              <div className="col-span-full py-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passport Image
                </label>
                {formData.passportImage && (
                  <div className="flex items-center mb-4">
                    <img
                      src={formData.passportImage}
                      alt="Passport"
                      className="h-32 w-32 rounded-md border-2 border-gray-300 shadow-lg"
                    />
                  </div>
                )}
                <label className="block">
                  <span className="sr-only">Choose passport image</span>
                  <input
                    type="file"
                    accept="image/*"
                    name="passportImage"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                    disabled={!editMode}
                  />
                </label>
              </div>
            </div>
          </div>

          {editMode && (
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
