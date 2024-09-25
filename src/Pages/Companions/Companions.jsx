import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/ApiSlices/profileSlice.js";
import { savePassengerData } from "../../Redux/ApiSlices/flightSlice.js";
import { useNavigate } from "react-router-dom";
import PassengerInfo from "./PassengerInfo.jsx";
import CompanionSelect from "./CompanionSelect.jsx";
import CompaniesDetails from "./components/CompaniesDetails.jsx";
import Headings from "../../Components/Headings/Headings";
import Button from "../../Components/Button/Button";
import LargeModal from "../../Components/Modal/LargeModal.jsx";
import ProfilePage from "../Profile/profile.jsx";

const Companions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile.profile);
  const flights = useSelector((state) => state.flights.resultSearch);

  const [open1,setOpen1]=useState(false);

  const [formData, setFormData] = useState({});
  const [formDataPassport, setFormDataPassport] = useState({});
  const [companions, setCompanions] = useState([]);
  const [errors, setErrors] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showPassengerInfo, setShowPassengerInfo] = useState(false);
  const [selectedCompanions, setSelectedCompanions] = useState([]);
  const [companiesDetailsData, setCompaniesDetailsData] = useState([]);

  // Calculate the number of passengers (adults + infants)
  const totalCompanions = (flights?.adults || 0) + (flights?.infants || 0);

  const NewArray=[];
  for(let i=0;i<totalCompanions;i++){
    NewArray.push(i);
  }
  useEffect(()=>{
    if(window.localStorage.getItem("sel_companion")){
      window.localStorage.removeItem("sel_companion");
    }
    window.scrollTo(0,0);
  },[]);
  useEffect(() => {
    console.log("Dispatching fetchProfile...");
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (flights && flights.booking_preference) {
      const bookingPreference = flights.booking_preference;
      setShowPassengerInfo(
        bookingPreference === "a" || bookingPreference === "b"
      );
    }
  }, [flights]);

  useEffect(() => {
    if (profile) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: profile?.user_id,
        passenger_id: profile.passenger?.passenger_id,
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
        passport_issued_date: passportInfo?.passport_issued_date ?? "",
      });

      setCompanions(profile.companions || []);
      console.log("Companions data:", profile.companions);
    }
  }, [profile]);

  const handleAccordionToggle = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
    console.log("Toggled accordion:", section);
  };

  const handleCompanionChange = (index, companionData) => {
    setSelectedCompanions((prevCompanions) => {
      const updatedCompanions = [...prevCompanions];
      updatedCompanions[index] = companionData?.companion_id || null;
      return updatedCompanions;
    });

    if (companionData) {
      setCompaniesDetailsData((prevData) => {
        const updatedDetails = [...prevData];
        updatedDetails[index] = companionData;
        return updatedDetails;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {}; // Add your validation logic here
    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        passengerInfo: { ...formData, ...formDataPassport },
        selectedCompanions, // Send selected companions data
        companiesDetails: companiesDetailsData, // Include CompaniesDetails data
      };

      console.log("Submitting payload:", payload);
      if(payload){
    window.localStorage.setItem("sel_companion",JSON.stringify(payload))

      }
      // Dispatch the payload to Redux
      dispatch(savePassengerData(payload));

      navigate("/reservation_seats");
    } else {
      console.log("Validation errors:", validationErrors);
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-50 py-2 min-h-screen flex flex-col">
    <LargeModal open={open1} setOpen={setOpen1}>
      <ProfilePage />
    </LargeModal>
      <div className="flex-grow mx-auto sm:p-2 md:p-2 my-8 bg-white rounded-lg shadow-md w-full max-w-screen-md sm:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
        <h1 className="md:text-3xl xs:text-xl font-bold mb-8 py-4 xs:pt-16 text-center border-b-2 border-gray-300">
          <Headings element={"h1"}>Enter Passenger Details</Headings>
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
          />
        )}
        {NewArray.length != 0 && <><h1 className="w-full p-6 md:text-xl xs:text-sm text-left rounded-t-md bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg">
          Your Adults {flights?.adults} and Infants {flights?.infants}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {NewArray?.map((_, index) => (
            <CompanionSelect
              key={index}
              onChange={(companionData) =>
                handleCompanionChange(index, companionData)
              }
              value={selectedCompanions[index]}
              selectedCompanions={selectedCompanions}
            />
          ))}
        </div></>}

        <div className="flex justify-center mt-8">
          <div className="relative flex justify-center items-center gap-2 flex-col md:flex-row">
          <Button width="130px" color={"#777"} padding="12px" onClick={()=>navigate(-1) }>
              Back
            </Button>
            <Button color={"#836E42"} padding="12px" onClick={()=>setOpen1(true)}>
               Edit profile
            </Button>
            <Button color={"#00529B"} padding="12px" onClick={handleSubmit}>
              Save Changes
            </Button>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companions;
