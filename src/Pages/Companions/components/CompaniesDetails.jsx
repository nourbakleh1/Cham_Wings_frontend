import React, { useEffect, useState } from "react";

const CompaniesDetails = ({ onChange }) => {
  const [numFields, setNumFields] = useState(0);
  const [fieldsData, setFieldsData] = useState([]);

  useEffect(() => {
    const fetchCompanionsDetails = async () => {
      try {
        const response = await privateRequest.get(
          "/api/passenger_companions_details"
        );
        const adultCount = response.data.Adult || 0;
        setNumFields(adultCount);
        const initialFieldsData = Array(adultCount).fill({});
        setFieldsData(initialFieldsData);
        onChange(initialFieldsData); // Update parent component on initialization
      } catch (error) {
        console.error("Failed to fetch companions details:", error);
      }
    };

    fetchCompanionsDetails();
  }, [onChange]);

  const handleFieldChange = (index, name, value) => {
    const updatedFields = [...fieldsData];
    updatedFields[index] = {
      ...updatedFields[index],
      [name]: value,
    };
    setFieldsData(updatedFields);
    onChange(updatedFields); // Update parent component whenever a field changes
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: numFields }).map((_, index) => (
        <div key={index}>
          <div className="w-full">
            <label htmlFor={`title-${index}`} className="text-gray-700">
              Title
            </label>
            <select
              id={`title-${index}`}
              name="title"
              value={fieldsData[index]?.title || ""}
              onChange={(e) =>
                handleFieldChange(index, "title", e.target.value)
              }
              className="input-field rounded-md h-11 mt-4 border-gray-300 focus:border-blue-600 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none"
            >
              <option value="Select" disabled>
                Select
              </option>
              <option value="Miss">Miss.</option>
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Ms">Ms.</option>
            </select>
          </div>
          <TextInput
            label="First Name"
            name="first_name"
            type="text"
            value={fieldsData[index]?.first_name || ""}
            onChange={(e) =>
              handleFieldChange(index, "first_name", e.target.value)
            }
          />
          <TextInput
            label="Last Name"
            name="last_name"
            type="text"
            value={fieldsData[index]?.last_name || ""}
            onChange={(e) =>
              handleFieldChange(index, "last_name", e.target.value)
            }
          />
          <DateInput
            label="Date of Birth"
            name="date_of_birth"
            selected={fieldsData[index]?.date_of_birth || ""}
            onChange={(date) => handleFieldChange(index, "date_of_birth", date)}
          />
          <TextInput
            label="Age"
            name="age"
            type="number"
            value={fieldsData[index]?.age || ""}
            onChange={(e) => handleFieldChange(index, "age", e.target.value)}
          />
          <div>
            <label
              htmlFor={`gender-${index}`}
              className="block text-sm font-medium text-black"
            >
              Gender
            </label>
            <select
              id={`gender-${index}`}
              name="gender"
              value={fieldsData[index]?.gender || ""}
              onChange={(e) =>
                handleFieldChange(index, "gender", e.target.value)
              }
              className="block w-full px-3 py-2 mt-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer transition ease-in-out duration-150"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompaniesDetails;
