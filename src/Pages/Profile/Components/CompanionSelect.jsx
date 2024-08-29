import React, { useEffect, useState } from "react";
import TextInput from "../../../Components/Fields/TextInput.jsx";
import DateInput from "../../../Components/Fields/DateInput.jsx";
import PhoneInputComponent from "../../../Components/Fields/PhoneInputComponent.jsx";
import ReactFlagsSelect from "react-flags-select";
import { privateRequest } from "../../../lib/privateRequest.js";
import { countryList } from "../../Profile/Countries/countryList.js";
import Toast from "../Toast/Toast.jsx";

const CompanionSelect = ({ onChange, value, editMode }) => {
  const [passenger, setPassenger] = useState(null);
  const [companions, setCompanions] = useState([]);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  console.log("Form DATA", formData);

  const getSelectedCountryCode = (countryName) => {
    const entry = countryList.find(({ name }) => name === countryName);
    return entry ? entry.code : "";
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

  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        const response = await privateRequest.get(
          "/api/passenger_companions_details"
        );

        if (response.data.success) {
          const fetchedPassenger = response.data.data.passenger;
          const fetchedCompanions = response.data.data.companions || [];

          setPassenger(fetchedPassenger);
          setCompanions(fetchedCompanions);

          const defaultCompanion =
            fetchedPassenger || fetchedCompanions[0] || null;
          setSelectedCompanion(defaultCompanion);
          setFormData(defaultCompanion);
          onChange(defaultCompanion);
        } else {
          setError("Failed to load companions");
          setToast({ message: "Failed to load companions", type: "error" });
        }
      } catch (error) {
        setError(
          `An error occurred while fetching companions: ${error.message}`
        );
        setToast({
          message: `An error occurred: ${error.message}`,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanions();
  }, []); // Empty dependency array ensures this runs only once

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selected =
      companions.find((c) => c.passenger_id === parseInt(selectedId)) ||
      passenger;

    setSelectedCompanion(selected);
    setFormData(selected); // Update formData with the selected companion's data
    onChange(selected); // Pass selected companion data to parent if needed
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await privateRequest.post(
        "/api/passenger_companions_details",
        formData
      );

      if (response.data.success) {
        setToast({
          message: "Companion information updated successfully!",
          type: "success",
        });
      } else {
        setToast({
          message: "Failed to update companion information.",
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        message: `An error occurred while submitting: ${error.message}`,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center">Loading companions...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const hasData = passenger || companions.length > 0;

  return (
    <div className="w-full mx-auto my-4">
      <label
        htmlFor="companion-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select Companion
      </label>
      <select
        id="companion-select"
        value={selectedCompanion?.passenger_id || ""}
        disabled={!editMode}
        onChange={handleSelectChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {passenger && (
          <option key={passenger.passenger_id} value={passenger.passenger_id}>
            {passenger.travel_requirement.first_name}{" "}
            {passenger.travel_requirement.last_name}
          </option>
        )}

        {companions.map((companion) => (
          <option key={companion.passenger_id} value={companion.passenger_id}>
            {companion.travel_requirement.first_name}{" "}
            {companion.travel_requirement.last_name}
          </option>
        ))}

        {!hasData && <option value="">No companions available</option>}
      </select>
      {selectedCompanion && (
        <div className="grid gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
          <TextInput
            label="First Name"
            name="first_name"
            disabled={!editMode}
            value={formData.travel_requirement?.first_name || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                travel_requirement: {
                  ...formData.travel_requirement,
                  first_name: e.target.value,
                },
              })
            }
            className="w-full"
          />
          <TextInput
            label="Last Name"
            name="last_name"
            disabled={!editMode}
            value={formData.travel_requirement?.last_name || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                travel_requirement: {
                  ...formData.travel_requirement,
                  last_name: e.target.value,
                },
              })
            }
            className="w-full"
          />
          <DateInput
            label="Date of Birth"
            name="date_of_birth"
            disabled={!editMode}
            selected={
              formData.travel_requirement?.date_of_birth
                ? new Date(formData.travel_requirement.date_of_birth)
                : null
            }
            onChange={(date) =>
              setFormData({
                ...formData,
                travel_requirement: {
                  ...formData.travel_requirement,
                  date_of_birth: date,
                },
              })
            }
            className="w-full"
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
              className="block w-full px-3 py-2 mt-5 border border-gray-300 rounded-md shadow-sm bg-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
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
              //   selected={formData.travel_requirement?.country_of_residence || ""}
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
          <PhoneInputComponent
            label="Mobile"
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
          {/* Add more fields as needed */}
        </div>
      )}
      {selectedCompanion && editMode && (
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-2 mt-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 transition duration-300"${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Save
        </button>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default CompanionSelect;
