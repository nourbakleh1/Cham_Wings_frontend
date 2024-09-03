import React, { useState } from "react";
import TextInput from "../../../../Components/Fields/TextInput.jsx";
import ReactFlagsSelect from "react-flags-select";
import { countryList } from "../../../Profile/Countries/countryList.js";
import PhoneInputComponent from "../../../../Components/Fields/PhoneInputComponent.jsx";
import Button from "../../../../Components/Button/Button.jsx";
import Toast from "../../Toast/Toast.jsx";
import { privateRequest } from "../../../../lib/privateRequest.js";

const CompanionForm = ({
  formData,
  setFormData,
  selectedCompanion,
  handleSubmit,
  isSubmitting,
  editMode,
  setEditMode,
  isAddingCompanion,
  setIsAddingCompanion,
  handleSubmitNewCompanion,
  handleChange,
}) => {
  const [toast, setToast] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      travel_requirement: {
        ...prevData.travel_requirement,
        [name]: value,
      },
    }));
  };

  const handleInfantChange = (e) => {
    const isInfant = e.target.value === "1" ? 1 : 0;
    setFormData((prevData) => ({
      ...prevData,
      infant: isInfant,
    }));
  };

  const handleNationalityChange = (countryCode) => {
    const selectedCountry =
      countryList.find(({ code }) => code === countryCode)?.name || "";
    setFormData((prevData) => ({
      ...prevData,
      travel_requirement: {
        ...prevData.travel_requirement,
        nationality: selectedCountry,
      },
    }));
  };

  const handleCountryChange = (countryCode) => {
    const selectedCountry =
      countryList.find(({ code }) => code === countryCode)?.name || "";
    setFormData((prevData) => ({
      ...prevData,
      travel_requirement: {
        ...prevData.travel_requirement,
        country_of_residence: selectedCountry,
      },
    }));
  };

  const getSelectedCountryCode = (countryName) => {
    const entry = countryList.find(({ name }) => name === countryName);
    return entry ? entry.code : "";
  };

  return (
    <div>
      <div className="w-full mx-auto my-4">
        <div className="grid gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
          <div className="w-full">
            <label htmlFor="title" className="text-black">
              Title
            </label>
            <select
              id="title"
              name="title"
              value={formData?.travel_requirement?.title || ""}
              onChange={handleChange}
              disabled={!editMode}
              // className="input-field rounded-md h-11 mt-4 border-gray-300 focus:border-blue-600 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none"
              className="block w-full px-3 py-2 mt-5 rounded-md shadow-sm outline-primary_color border-2 border-gray-300 bg-white"
            >
              <option value="" disabled>
                Select a Title
              </option>
              <option value="Mr">Mr.</option>
              <option value="Miss">Miss.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Ms">Ms.</option>
            </select>
          </div>
          <TextInput
            label="First Name"
            name="first_name"
            disabled={!editMode}
            value={formData.travel_requirement?.first_name || ""}
            onChange={handleInputChange}
            className="w-full"
          />
          <TextInput
            label="Last Name"
            name="last_name"
            disabled={!editMode}
            value={formData.travel_requirement?.last_name || ""}
            onChange={handleInputChange}
            className="w-full"
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
              value={formData.travel_requirement?.date_of_birth || ""}
              onChange={(e) => {
                const formattedDate = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  travel_requirement: {
                    ...prevData.travel_requirement,
                    date_of_birth: formattedDate,
                  },
                }));
              }}
              max={new Date().toISOString().split("T")[0]}
              className="input-field rounded-md mt-4"
            />
          </div>
          <TextInput
            label="Age"
            name="age"
            type="number"
            value={formData?.travel_requirement?.age || ""}
            onChange={handleInputChange}
            disabled={true}
          />
          <div className="w-full">
            <label className="block text-sm font-medium text-black">
              Gender
            </label>
            <select
              value={formData.travel_requirement?.gender || ""}
              disabled={!editMode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  travel_requirement: {
                    ...formData.travel_requirement,
                    gender: e.target.value,
                  },
                })
              }
              className="block w-full px-3 py-2 mt-5 rounded-md shadow-sm outline-primary_color border-2 border-gray-300 bg-white"
            >
              <option value="" disabled>
                Choose a Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="text-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nationality
            </label>
            <ReactFlagsSelect
              searchPlaceholder="Select Nationality"
              selected={getSelectedCountryCode(
                formData.travel_requirement?.nationality
              )}
              onSelect={handleNationalityChange}
              disabled={!editMode}
              searchable
              name="nationality"
              className="w-full mt-5 text-black"
              id="nationality"
            />
          </div>
          <TextInput
            label="Address"
            name="address"
            value={formData.travel_requirement?.address || ""}
            disabled={!editMode}
            onChange={(e) =>
              setFormData({
                ...formData,
                travel_requirement: {
                  ...formData.travel_requirement,
                  address: e.target.value,
                },
              })
            }
            className="w-full"
          />
          <TextInput
            label="City"
            name="city"
            value={formData.travel_requirement?.city || ""}
            disabled={!editMode}
            onChange={(e) =>
              setFormData({
                ...formData,
                travel_requirement: {
                  ...formData.travel_requirement,
                  city: e.target.value,
                },
              })
            }
            className="w-full"
          />
          <div className="text-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country Of Residence
            </label>
            <ReactFlagsSelect
              searchPlaceholder="Search countries"
              selected={getSelectedCountryCode(
                formData.travel_requirement?.country_of_residence
              )}
              disabled={!editMode}
              onSelect={handleCountryChange}
              searchable
              name="country_of_residence"
              className="w-full mt-5 text-black"
              id="country_of_residence"
            />
          </div>
          <TextInput
            label="Id Number"
            name="id_number"
            value={formData.travel_requirement?.id_number || ""}
            disabled={!editMode}
            onChange={(e) =>
              setFormData({
                ...formData,
                travel_requirement: {
                  ...formData.travel_requirement,
                  id_number: e.target.value,
                },
              })
            }
            className="w-full"
          />
          <PhoneInputComponent
            label="Mobile During Travel"
            name="phone"
            value={formData.travel_requirement?.mobile_during_travel || ""}
            disabled={!editMode}
            onChange={(phone) =>
              setFormData({
                ...formData,
                travel_requirement: {
                  ...formData.travel_requirement,
                  mobile_during_travel: phone,
                },
              })
            }
            className="w-full"
          />
          {/* Infant Select Menu */}
          <div className="w-full">
            <label className="block text-sm font-medium text-black mb-4">
              Infant
            </label>
            <select
              value={formData.infant || "0"}
              onChange={handleInfantChange}
              disabled={!editMode}
              className="block w-full px-3 py-2 mb-4 rounded-md shadow-sm outline-primary_color border-2 border-gray-300 bg-white"
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
      </div>
      {editMode && (
        <div className="relative flex justify-center items-center">
          {selectedCompanion && (
            <Button
              color={"#00529B"}
              padding="12px"
              width="100%"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Companion"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
  {
    toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    );
  }
};

export default CompanionForm;
