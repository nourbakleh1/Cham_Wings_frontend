import React from "react";
import { Collapse } from "react-collapse";
import TextInput from "../../Components/Fields/TextInput.jsx";
import DateInput from "../../Components/Fields/DateInput.jsx";
import PhoneInputComponent from "../../Components/Fields/PhoneInputComponent.jsx";
import ReactFlagsSelect from "react-flags-select";
import { countryList } from "../Profile/Countries/countryList.js";

const ReadOnlyInput = ({ label, value, className }) => (
  <TextInput label={label} value={value} disabled className={className} />
);

const getSelectedCountryCode = (countryName) => {
  const entry = countryList.find(({ name }) => name === countryName);
  return entry ? entry.code : "";
};

const PassengerInfo = ({ formData, formDataPassport, isOpen, setIsOpen }) => (
  <div className="mt-0 mb-8 bg-white rounded-lg shadow-lg w-full max-w-full overflow-hidden">
    <h1 className="w-full p-6 md:text-xl xs:text-sm text-left bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg">
      Passenger Information
    </h1>
    <div className="p-6 space-y-6">
      <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ReadOnlyInput
          label="First Name"
          value={formData.first_name}
          className="w-full"
        />
        <ReadOnlyInput
          label="Last Name"
          value={formData.last_name}
          className="w-full"
        />
        <DateInput
          label="Date of Birth"
          selected={formData.date_of_birth}
          disabled
          className="w-full"
        />
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-5">
            Gender
          </label>
          <select
            value={formData.gender}
            disabled
            className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-5">
            Nationality
          </label>
          <ReactFlagsSelect
            searchPlaceholder="Select Nationality"
            selected={getSelectedCountryCode(formData.nationality)}
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
              selected={getSelectedCountryCode(formData.country_of_residence)}
              disabled
              className="w-full text-gray-700 bg-gray-100"
            />
          </div>
          <PhoneInputComponent
            label="Mobile"
            value={formData.phone}
            disabled
            className="w-full"
          />
          <PhoneInputComponent
            label="Mobile During Travel"
            value={formData.mobile_during_travel}
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
            value={formDataPassport.number}
            className="w-full"
          />
          <DateInput
            label="Passport Expiry Date"
            selected={formDataPassport.passport_expiry_date}
            disabled
            className="w-full"
          />
        </div>
        {/* =================================================== */}
        {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        </div> */}
      </Collapse>
      <button
        className="w-full p-2 hover:bg-gray-200 hover:rounded-lg focus:outline-none text-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Show Less" : "Read More"}
        <svg
          className={`inline-block h-5 w-5 ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
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
);

export default PassengerInfo;
