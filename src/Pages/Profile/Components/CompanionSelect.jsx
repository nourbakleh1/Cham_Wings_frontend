import React, { useEffect, useState } from "react";
import CompanionForm from "./Companion/CompanionForm.jsx";
import CompanionSelectDropdown from "./Companion/CompanionSelectDropdown.jsx";
import PassportForm from "./Companion/PassportForm.jsx";
import { privateRequest } from "../../../lib/privateRequest.js";
import Toast from "../Toast/Toast.jsx";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";

const CompanionSelect = ({ onChange }) => {
  const [passenger, setPassenger] = useState(null);
  const [companions, setCompanions] = useState([]);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [passengerData, setPassengerData] = useState({
    number: "",
    passport_issued_country: "",
    passport_issued_date: "",
    passport_expiry_date: "",
    passport_image: "",
  });
  const [isAddingCompanion, setIsAddingCompanion] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      travel_requirement: {
        ...prevData.travel_requirement,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        const response = await privateRequest.get("/api/passengers");
        if (response.data.success) {
          const fetchedPassenger = response.data.data.passenger;
          const fetchedCompanions =
            response.data.data.filter(
              (companion) => companion && companion.travel_requirement
            ) || [];

          setPassenger(fetchedPassenger);
          setCompanions(fetchedCompanions);

          const defaultCompanion =
            fetchedPassenger || fetchedCompanions[0] || null;
          setSelectedCompanion(defaultCompanion);
          setFormData(defaultCompanion || { travel_requirement: {} });
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
  }, [refreshTrigger]);

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        if (selectedCompanion && selectedCompanion.travel_requirement_id) {
          const response = await privateRequest.get(
            `/api/passengers/${selectedCompanion.travel_requirement_id}`
          );
          const passenger = response.data.data;

          const passport = passenger.passports[0] || {};

          setPassengerData({
            number: passport.number || "",
            passport_issued_country: passport.passport_issued_country || "",
            passport_issued_date: passport.passport_issued_date || "",
            passport_expiry_date: passport.passport_expiry_date || "",
            passport_image: passport.passport_image || "",
            status: "Active",
            passport_id: passport.passport_id || "",
          });
          console.log("passenger",passenger)
          setFormData({
            ...formData,
            companion_id: passenger.companion?.companion_id,
            passenger_id: passenger.companion?.passenger_id,
            travel_requirement_id: passenger.travel_requirement_id,
          });
        } else {
          setPassengerData({
            number: "",
            passport_issued_country: "",
            passport_issued_date: "",
            passport_expiry_date: "",
            passport_image: "",
            status: "Active",
          });
        }
      } catch (error) {
        console.error("Error fetching passenger data:", error);
      }
    };

    fetchPassengerData();
  }, [selectedCompanion]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!formData.travel_requirement_id) {
        throw new Error("Travel requirement ID is missing");
      }

      const fetchResponse = await privateRequest.get(
        `/api/passengers/${formData.travel_requirement_id}`
      );

      if (!fetchResponse.data.success) {
        throw new Error("Failed to fetch passenger data.");
      }
      const fetchedData = fetchResponse.data.data;

      const updatedData = {
        ...formData,
      };

      const flattenedData = {
        status: "Active",
        companion_id: updatedData.companion_id,
        passenger_id: updatedData.passenger_id,
        travel_requirement_id: updatedData.travel_requirement_id,
        infant: formData.infant ? 1 : 0,
        title: updatedData.title || "",
        gender: updatedData.gender || "male",
        number: updatedData.number,
        passport_issued_country: updatedData.passport_issued_country,
        passport_issued_date: updatedData.passport_issued_date,
        passport_expiry_date: updatedData.passport_expiry_date,
        passport_image: updatedData.passport_image,
        ...updatedData.travel_requirement,
      };


      Object.keys(flattenedData).forEach(
        (key) =>
          (flattenedData[key] === undefined || flattenedData[key] === null) &&
          delete flattenedData[key]
      );

      if (flattenedData.date_of_birth instanceof Date) {
        flattenedData.date_of_birth = flattenedData.date_of_birth
          .toISOString()
          .split("T")[0];
      }

      const updateResponse = await privateRequest.put(
        `/api/passengers/${flattenedData.travel_requirement_id}`,
        flattenedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (updateResponse.data.success) {
        setToast({
          message: "Companion information updated successfully!",
          type: "success",
        });
        handleRefresh(); // Refresh after successful update
        setEditMode(false);
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
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitNewCompanion = async () => {
    setIsSubmitting(true);

    try {
      const newCompanionData = {
        status: "Active",
        infant: formData.infant ? 1 : 0,
        title: formData.title || "",
        gender: formData.gender || "male",
        companion_id: formData.companion_id,
        passenger_id: formData.passenger_id,
        travel_requirement_id: formData.travel_requirement_id,
        number: passengerData.number,
        passport_issued_country: passengerData.passport_issued_country,
        passport_issued_date: passengerData.passport_issued_date,
        passport_expiry_date: passengerData.passport_expiry_date,
        passport_image: passengerData.passport_image,
        ...formData.travel_requirement,
      };

      const response = await privateRequest.post(
        "/api/passengers",
        newCompanionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setToast({
          message: "New companion added successfully!",
          type: "success",
        });
        handleRefresh(); // Refresh after successful addition
        setIsAddingCompanion(false);
        setEditMode(false);
      } else {
        setToast({
          message: "Failed to add new companion.",
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        message: `An error occurred while adding: ${error.message}`,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  if (loading) return <div className="text-center">Loading companions...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <LoadingSpinner />
        </div>
      )}
      <CompanionSelectDropdown
        passenger={passenger}
        companions={companions}
        selectedCompanion={selectedCompanion}
        setPassengerData={setPassengerData}
        setSelectedCompanion={setSelectedCompanion}
        setFormData={setFormData}
        onChange={onChange}
        handleRefresh={handleRefresh}
        toggleEditMode={toggleEditMode}
        editMode={editMode}
        setEditMode={setEditMode}
        isAddingCompanion={isAddingCompanion}
        setIsAddingCompanion={setIsAddingCompanion}
      />

      <CompanionForm
        formData={formData}
        setFormData={setFormData}
        selectedCompanion={selectedCompanion}
        setSelectedCompanion={setSelectedCompanion}
        handleSubmit={handleSubmit}
        editMode={editMode}
        isSubmitting={isSubmitting}
        isAddingCompanion={isAddingCompanion}
        setIsAddingCompanion={setIsAddingCompanion}
        handleSubmitNewCompanion={handleSubmitNewCompanion}
        handleInfantChange={(value) =>
          setFormData((prev) => ({ ...prev, infant: value }))
        }
        handleChange={handleChange}
      />
      <PassportForm
        formData={formData}
        setFormData={setFormData}
        selectedCompanion={selectedCompanion}
        setSelectedCompanion={setSelectedCompanion}
        refreshTrigger={refreshTrigger}
        setRefreshTrigger={setRefreshTrigger}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        editMode={editMode}
        setEditMode={setEditMode}
        isSubmitting={isSubmitting}
        handleSubmitNewCompanion={handleSubmitNewCompanion}
        isAddingCompanion={isAddingCompanion}
        setIsAddingCompanion={setIsAddingCompanion}
        passengerData={passengerData}
        setPassengerData={setPassengerData}
      />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
};

export default CompanionSelect;
