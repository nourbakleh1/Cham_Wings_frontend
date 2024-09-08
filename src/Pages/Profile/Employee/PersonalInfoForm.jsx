import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateEmpProfile,
} from "../../../Redux/ApiSlices/profileSlice.js";
import TextInput from "../../../Components/Fields/TextInput.jsx";
import PhoneInputComponent from "../../../Components/Fields/PhoneInputComponent.jsx";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../Components/Button/Button.jsx";
import VerifyEmail_epm from "../../Admin/Components/Manage_employees/Components/VerifyEmail_epm.jsx";

const PersonalInfoForm = ({ editMode, toggleEditMode }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [formData, setFormData] = useState({
    name: "",
    job_title: "",
    department: "",
    role: "",
    phone: "",
    email: "",
    old_password: "",
    password: "",
    confirm_password: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verifyEmailData, setVerifyEmailData] = useState({
    email: "",
    id: "",
    page: 1,
  });

  const API_BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.employee?.employee_id ?? "",
        name: profile.employee?.name ?? "",
        job_title: profile.employee?.job_title ?? "",
        department: profile.employee?.department ?? "",
        role: profile.employee?.roles?.[0]?.name ?? "",
        phone: profile.phone ?? "",
        email: profile.email ?? "",
        old_password: "",
        password: "",
        confirm_password: "",
        image: profile.image ?? "",
      });
      setProfileImagePreview(
        profile.image ? `${API_BASE_URL}/${profile.image}` : null
      );
    }
  }, [profile]);

  const handleChange = (e) => {
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
    setIsLoading(true);
    console.log("Submitting form with data:", formData);
    if (
      formData.email === profile.email &&
      formData.old_password === "" &&
      formData.password === "" &&
      formData.confirm_password === ""
    ) {
      // If the email hasn't changed, update the profile without email verification
      dispatch(updateEmpProfile({ profile: formData, profileImage }))
        .unwrap()
        .then((response) => {
          setIsLoading(false);

          if (response.success) {
            toast.success("Profile updated successfully!");
          }

          if (typeof toggleEditMode === "function") {
            toggleEditMode(false);
          }

          dispatch(fetchProfile());
        })
        .catch((error) => {
          setIsLoading(false);
          handleError(error);
          toggleEditMode(false);
        });
    } else {
      // If the email has changed, proceed with the profile update and email verification
      dispatch(updateEmpProfile({ profile: formData, profileImage }))
        .unwrap()
        .then((response) => {
          setIsLoading(false);

          if (response.success && response.data) {
            toast.success(`${response.success} New email: ${response.data}`);
            // Set modal data and open the modal
            setVerifyEmailData({
              email: formData.email,
              id: profile.employee?.employee_id,
              page: 1,
            });
            setVerifyModalOpen(true);
          } else if (response.success) {
            toast.success(response.success);
          }

          if (typeof toggleEditMode === "function") {
            toggleEditMode(false);
          }

          dispatch(fetchProfile());
        })
        .catch((error) => {
          setIsLoading(false);
          handleError(error);
          toggleEditMode(false);
        });
    }
  };

  const handleError = (error) => {
    if (error.errors) {
      setErrors(error.errors);
    } else {
      toast.error(error.message || "Update failed. Please try again.");
      setErrors({ general: error.message });
    }
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
              src={`${API_BASE_URL}/${profile.image}`}
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
          <TextInput
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.name}
          />
          <TextInput
            label="Job Title"
            name="job_title"
            type="text"
            value={formData.job_title}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.job_title}
          />
          <TextInput
            label="Department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.department}
          />
          <TextInput
            label="Role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.role}
          />
          <PhoneInputComponent
            label="Mobile"
            name="phone"
            value={formData.phone}
            onChange={(phone) => handlePhoneChange("phone", phone)}
            disabled={!editMode}
            error={errors.phone}
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
          <TextInput
            label="Old Password"
            name="old_password"
            type="password"
            value={formData.old_password}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.old_password}
          />
          <TextInput
            label="New Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.password}
          />
          <TextInput
            label="Confirm Password"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            onChange={handleChange}
            disabled={!editMode}
            error={errors.confirm_password}
          />
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}
        </div>
      </div>

      {!buttonHidden && editMode && (
        <div className="relative flex justify-center items-center">
          <Button
            type="submit"
            color={"#836E42"}
            padding="12px"
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      )}

      <VerifyEmail_epm
        open4={isVerifyModalOpen}
        setOpen4={setVerifyModalOpen}
        email={verifyEmailData.email}
        id={verifyEmailData.id}
        page={verifyEmailData.page}
      />
    </form>
  );
};

PersonalInfoForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};

export default PersonalInfoForm;
