import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/ApiSlices/profileSlice.js";
import { privateRequest } from "../../lib/privateRequest.js";
import axios from "axios";
import PassengerInfo from "./PassengerInfo.jsx";
import CompanionSelect from "./CompanionSelect.jsx";
import CompaniesDetails from "./components/CompaniesDetails.jsx";

const Companions = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [formData, setFormData] = useState({});
  const [formDataPassport, setFormDataPassport] = useState({});
  const [companions, setCompanions] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showPassengerInfo, setShowPassengerInfo] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState("");
  const [companiesDetailsData, setCompaniesDetailsData] = useState([]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    const fetchPassengerStatus = async () => {
      try {
        const response = await privateRequest.get(
          "/api/passenger_companions_details"
        );
        if (response.data && response.data.booking_preference) {
          const bookingPreference = response.data.booking_preference;
          setShowPassengerInfo(
            bookingPreference === "a" || bookingPreference === "b"
          );
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch passenger status:", error);
      }
    };

    fetchPassengerStatus();
  }, []);

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
      }));

      const passportInfo =
        profile?.passenger?.travel_requirement?.passports?.[0] ?? {};
      setFormDataPassport({
        passport_id: passportInfo?.passport_id ?? "",
        number: passportInfo?.number ?? "",
        passport_expiry_date: passportInfo?.passport_expiry_date ?? "",
      });

      setCompanions(profile.companions || []);
    }
  }, [profile]);

  const handleAccordionToggle = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleCompanionChange = (companionId) => {
    setSelectedCompanion(companionId);
  };

  const handleCompaniesDetailsChange = (data) => {
    setCompaniesDetailsData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {}; // Add your validation logic here
    if (Object.keys(validationErrors).length === 0) {
      try {
        const payload = {
          passengerInfo: { ...formData, ...formDataPassport },
          selectedCompanion,
          companions,
          companiesDetails: companiesDetailsData, // Include CompaniesDetails data
        };
        await axios.post("/api/submitProfile", payload);
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
        {showPassengerInfo && (
          <PassengerInfo
            formData={formData}
            formDataPassport={formDataPassport}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            errors={errors}
            handleChange={() => {}} // Define this method
            handleDateChange={() => {}} // Define this method
            handleAccordionToggle={handleAccordionToggle}
            activeAccordion={activeAccordion}
            selectedCompanion={selectedCompanion}
            companions={companions}
            handleCompanionChange={handleCompanionChange}
            handleSubmit={handleSubmit}
          />
        )}
        <CompanionSelect
          companions={companions}
          selectedCompanion={selectedCompanion}
          handleCompanionChange={handleCompanionChange}
        />
        <CompaniesDetails onChange={handleCompaniesDetailsChange} />{" "}
        {/* Pass callback to CompaniesDetails */}
        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Companions;
