import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPassportInfo,
  updatePassportInfo,
} from "../../../Redux/ApiSlices/profileSlice.js";
import TextInput from "../../../Components/Fields/TextInput.jsx";
import DateInput from "../../../Components/Fields/DateInput.jsx";
import ReactFlagsSelect from "react-flags-select";
import { validateProfileForm } from "../validation.js";
import { countryList } from "../Countries/countryList.js";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";
import Toast from "../Toast/Toast.jsx";
import PropTypes from "prop-types";
import PassportImageUpload from "./PassportImageUpload";

const PassportInfoForm = ({ editModePassport, toggleEditMode }) => {
  const dispatch = useDispatch();
  const passportInfo = useSelector((state) => state.profile.passportInfo);
  const [formDataPassport, setFormDataPassport] = useState({
    passport_id: "",
    number: "",
    passport_issued_country: "",
    passport_issued_date: "",
    passport_expiry_date: "",
    passport_image: null,
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(fetchPassportInfo());
  }, [dispatch]);

  useEffect(() => {
    if (passportInfo) {
      setFormDataPassport((prevData) => ({
        ...prevData,
        passport_id: passportInfo.passport_id ?? "",
        number: passportInfo.number ?? "",
        passport_issued_country: passportInfo.passport_issued_country ?? "",
        passport_issued_date: passportInfo.passport_issued_date ?? "",
        passport_expiry_date: passportInfo.passport_expiry_date ?? "",
        passport_image: passportInfo.passport_image ?? "",
      }));
    }
  }, [passportInfo]);

  const getSelectedCountryCode = (countryName) => {
    const entry = countryList.find(({ name }) => name === countryName);
    return entry ? entry.code : "";
  };

  const handlePassportDateChange = (name, date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    setFormDataPassport((prevData) => ({
      ...prevData,
      [name]: formattedDate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateProfileForm(formDataPassport);
    console.log("Validation Errors:", validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      dispatch(updatePassportInfo(formDataPassport))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          setToast({
            message: "Passport information updated successfully!",
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
          setErrors(error.errors || { general: error.message });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormDataPassport((prevData) => ({
      ...prevData,
      passport_image: file,
    }));

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormDataPassport((prevData) => ({
      ...prevData,
      passport_image: null,
    }));
  };

  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative space-y-8 ${
        isLoading ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <TextInput
          label="Passport Number"
          name="number"
          type="number"
          value={formDataPassport.number}
          onChange={(e) =>
            setFormDataPassport({
              ...formDataPassport,
              number: e.target.value,
            })
          }
          disabled={!editModePassport || isLoading}
          error={errors.number}
        />
        <div className="text-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passport Issued Country
          </label>
          <ReactFlagsSelect
            searchPlaceholder="select Passport Issued Country"
            selected={getSelectedCountryCode(
              formDataPassport.passport_issued_country
            )}
            onSelect={(code) =>
              setFormDataPassport({
                ...formDataPassport,
                passport_issued_country:
                  countryList.find((c) => c.code === code)?.name || "",
              })
            }
            searchable
            name="passport_issued_country"
            disabled={!editModePassport || isLoading}
            className="w-full mt-5 text-black"
            id="passport_issued_country"
          />
          {errors.passport_issued_country && (
            <p className="text-red-500 text-sm">
              {errors.passport_issued_country}
            </p>
          )}
        </div>
        <DateInput
          label="Passport Issued Date"
          name="passport_issued_date"
          type="event"
          selected={formDataPassport.passport_issued_date}
          onChange={(date) =>
            handlePassportDateChange("passport_issued_date", date)
          }
          disabled={!editModePassport || isLoading}
          error={errors.passport_issued_date}
        />
        <DateInput
          label="Passport Expiry Date"
          name="passport_expiry_date"
          type="event"
          selected={
            formDataPassport.passport_expiry_date
              ? new Date(formDataPassport.passport_expiry_date)
              : null
          }
          minDate={
            formDataPassport.passport_issued_date
              ? new Date(formDataPassport.passport_issued_date)
              : null
          }
          onChange={(date) =>
            handlePassportDateChange("passport_expiry_date", date)
          }
          disabled={!editModePassport || isLoading}
          error={errors.passport_expiry_date}
        />
        <PassportImageUpload
          imagePreview={imagePreview}
          passportImage={formDataPassport.passport_image}
          onFileChange={handleFileChange}
          onRemoveImage={handleRemoveImage}
          isDisabled={!editModePassport || isLoading}
          error={errors.passport_image}
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}

      {!buttonHidden && editModePassport && (
        <div className="relative">
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 transition duration-300"
            disabled={isLoading}
          >
            Save Passport Changes
          </button>
        </div>
      )}

      {/* Show Toast notification if there is a message */}
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

PassportInfoForm.propTypes = {
  editModePassport: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};

export default PassportInfoForm;
