import React, { useEffect, useState } from "react";
import TextInput from "../../Components/Fields/TextInput.jsx";
import DateInput from "../../Components/Fields/DateInput.jsx";
import PhoneInputComponent from "../../Components/Fields/PhoneInputComponent.jsx";
import ReactFlagsSelect from "react-flags-select";
import { countryList } from "../Profile/Countries/countryList.js";
import { privateRequest } from "../../lib/privateRequest.js";

const CompanionSelect = ({ onChange, value }) => {
  const [passenger, setPassenger] = useState(null);
  const [companions, setCompanions] = useState([]);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        const response = await privateRequest.get(
          "/api/passenger_companions_details"
        );

        if (response.data.success) {
          setPassenger(response.data.data.passenger);
          setCompanions(response.data.data.companions || []);
        } else {
          setError("Failed to load companions");
        }
      } catch (error) {
        setError(
          `An error occurred while fetching companions: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanions();
  }, []);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selected =
      companions.find((c) => c.passenger_id === parseInt(selectedId)) ||
      passenger;
    setSelectedCompanion(selected);
    onChange(selected); // Pass selected companion data to parent if needed
  };

  if (loading) return <div className="text-center">Loading companions...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const hasData = passenger || companions.length > 0;

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <label
        htmlFor="companion-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select Companion
      </label>
      <select
        id="companion-select"
        value={selectedCompanion?.passenger_id || ""}
        onChange={handleSelectChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select a companion</option>

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
            value={selectedCompanion.travel_requirement.first_name || ""}
            onChange={(e) =>
              setSelectedCompanion({
                ...selectedCompanion,
                travel_requirement: {
                  ...selectedCompanion.travel_requirement,
                  first_name: e.target.value,
                },
              })
            }
            className="w-full"
          />
          <TextInput
            label="Last Name"
            name="last_name"
            value={selectedCompanion.travel_requirement.last_name || ""}
            onChange={(e) =>
              setSelectedCompanion({
                ...selectedCompanion,
                travel_requirement: {
                  ...selectedCompanion.travel_requirement,
                  last_name: e.target.value,
                },
              })
            }
            className="w-full"
          />
          <DateInput
            label="Date of Birth"
            name="date_of_birth"
            selected={
              selectedCompanion.travel_requirement.date_of_birth
                ? new Date(selectedCompanion.travel_requirement.date_of_birth)
                : null
            }
            onChange={(date) =>
              setSelectedCompanion({
                ...selectedCompanion,
                travel_requirement: {
                  ...selectedCompanion.travel_requirement,
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
              value={selectedCompanion.travel_requirement.gender || ""}
              onChange={(e) =>
                setSelectedCompanion({
                  ...selectedCompanion,
                  travel_requirement: {
                    ...selectedCompanion.travel_requirement,
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
              selected={selectedCompanion.travel_requirement.nationality || ""}
              onSelect={(code) =>
                setSelectedCompanion({
                  ...selectedCompanion,
                  travel_requirement: {
                    ...selectedCompanion.travel_requirement,
                    nationality: code,
                  },
                })
              }
              searchable
              name="nationality"
              className="w-full mt-5 text-black"
              id="nationality"
            />
          </div>
          <TextInput
            label="Address"
            name="address"
            value={selectedCompanion.travel_requirement.address || ""}
            onChange={(e) =>
              setSelectedCompanion({
                ...selectedCompanion,
                travel_requirement: {
                  ...selectedCompanion.travel_requirement,
                  address: e.target.value,
                },
              })
            }
            className="w-full"
          />
          <TextInput
            label="City"
            name="city"
            value={selectedCompanion.travel_requirement.city || ""}
            onChange={(e) =>
              setSelectedCompanion({
                ...selectedCompanion,
                travel_requirement: {
                  ...selectedCompanion.travel_requirement,
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
              selected={
                selectedCompanion.travel_requirement.country_of_residence || ""
              }
              onSelect={(code) =>
                setSelectedCompanion({
                  ...selectedCompanion,
                  travel_requirement: {
                    ...selectedCompanion.travel_requirement,
                    country_of_residence: code,
                  },
                })
              }
              searchable
              name="country_of_residence"
              className="w-full mt-5 text-black"
              id="country_of_residence"
            />
          </div>
          <PhoneInputComponent
            label="Mobile"
            name="phone"
            value={
              selectedCompanion.travel_requirement.mobile_during_travel || ""
            }
            onChange={(phone) =>
              setSelectedCompanion({
                ...selectedCompanion,
                travel_requirement: {
                  ...selectedCompanion.travel_requirement,
                  mobile_during_travel: phone,
                },
              })
            }
            className="w-full"
          />
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default CompanionSelect;
