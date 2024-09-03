import React, { useEffect, useState } from "react";
import TextInput from "../../../../Components/Fields/TextInput.jsx";
import ReactFlagsSelect from "react-flags-select";
import { countryList } from "../../../Profile/Countries/countryList.js";
import PassportImageUpload from "../../Components/PassportImageUpload.jsx";
import Button from "../../../../Components/Button/Button.jsx";
import LoadingSpinner from "../../Loading/LoadingSpinner.jsx";
import Toast from "../../Toast/Toast.jsx";
import { privateRequest } from "../../../../lib/privateRequest.js";

const PassportForm = ({
  formData,
  setFormData,
  editMode,
  setEditMode,
  refreshTrigger,
  setRefreshTrigger,
  selectedCompanion,
  setImagePreview,
  imagePreview,
  handleSubmitNewCompanion,
  isAddingCompanion,
  setIsAddingCompanion,
  passengerData,
  setPassengerData,
}) => {
  //   const [passengerData, setPassengerData] = useState({
  //     number: "",
  //     passport_issued_country: "",
  //     passport_issued_date: "",
  //     passport_expiry_date: "",
  //     passport_image: "",
  //   });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;
    setPassengerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (countryCode) => {
    const selectedCountry =
      countryList.find(({ code }) => code === countryCode)?.name || "";
    setPassengerData((prevData) => ({
      ...prevData,
      passport_issued_country: selectedCountry,
    }));
  };

  const getSelectedCountryCode = (countryName) => {
    const entry = countryList.find(({ name }) => name === countryName);
    return entry ? entry.code : "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB size limit
        console.error("File size exceeds 5MB limit.");
        return;
      }

      // Update local state with the file
      setPassengerData((prevData) => ({
        ...prevData,
        passport_image: file, // Storing the file in state
      }));

      // Create an object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      // Clean up object URL when component unmounts or when preview changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setPassengerData((prevData) => ({
      ...prevData,
      passport_image: null,
    }));
  };

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        if (selectedCompanion && selectedCompanion.travel_requirement_id) {
          const response = await privateRequest.get(
            `/api/passengers/${selectedCompanion.travel_requirement_id}`
          );
          const passenger = response.data.data;

          // Assuming the first passport is the relevant one
          const passport = passenger.passports[0] || {};

          setPassengerData({
            status: "Active",
            passport_id: passport.passport_id || "",
            number: passport.number || "",
            passport_issued_country: passport.passport_issued_country || "",
            passport_issued_date: passport.passport_issued_date || "",
            passport_expiry_date: passport.passport_expiry_date || "",
            passport_image: passport.passport_image || "",
          });
        } else {
          // Reset passenger data if no companion is selected
          setPassengerData({
            number: "",
            passport_issued_country: "",
            passport_issued_date: "",
            passport_expiry_date: "",
            passport_image: "",
          });
        }
      } catch (error) {
        console.error("Error fetching passenger data:", error);
      }
    };

    fetchPassengerData();
  }, [selectedCompanion]);

  const handleSubmitPassport = async () => {
    setIsSubmitting(true);

    try {
      const flattenedData = {
        status: "Active",
        companion_id: formData.companion_id,
        passenger_id: formData.passenger_id,
        travel_requirement_id: formData.travel_requirement_id,
        infant: formData.infant ? 1 : 0,
        title: formData.title || "",
        gender: formData.gender || "male",
        number: passengerData.number,
        passport_issued_country: passengerData.passport_issued_country,
        passport_issued_date: passengerData.passport_issued_date,
        passport_expiry_date: passengerData.passport_expiry_date,
        passport_image: passengerData.passport_image,
        ...formData.travel_requirement,
      };

      console.log("Data to submit:", flattenedData);

      const { passport_id } = passengerData;

      if (passport_id) {
        const updateResponse = await privateRequest.post(
          `/api/passports/${passport_id}`,
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
          setEditMode(false); // Assuming you have an edit mode state to manage form editing
          setRefreshTrigger((prev) => prev + 1); // Optional: Trigger any necessary updates
        } else {
          setToast({
            message: "Failed to update companion information.",
            type: "error",
          });
        }
      } else {
        console.error("Passport ID is missing.");
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

  return (
    <div className="w-full mx-auto my-4">
      <div>
        <div className="w-full mx-auto my-4">
          <div className="grid gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <TextInput
              label="Passport Number"
              name="number"
              type="number"
              value={passengerData.number}
              onChange={handleChangeNumber}
              disabled={!editMode}
              error={errors.number}
            />
            <div className="text-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport Issued Country
              </label>
              <ReactFlagsSelect
                searchPlaceholder="select Passport Issued Country"
                selected={getSelectedCountryCode(
                  passengerData.passport_issued_country
                )}
                onSelect={handleCountryChange}
                searchable
                name="passport_issued_country"
                disabled={!editMode}
                className="w-full mt-5 text-black"
                id="passport_issued_country"
              />
              {errors.passport_issued_country && (
                <p className="text-red-500 text-sm">
                  {errors.passport_issued_country}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="passport_issued_date"
                className="text-black text-sm"
              >
                Passport Issued Date
              </label>
              <input
                type="date"
                id="passport_issued_date"
                name="passport_issued_date"
                disabled={!editMode}
                value={passengerData.passport_issued_date}
                onChange={(e) =>
                  setPassengerData((prevData) => ({
                    ...prevData,
                    passport_issued_date: e.target.value,
                  }))
                }
                max={new Date().toISOString().split("T")[0]}
                className="input-field rounded-md mt-4 w-full"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="passport_expiry_date"
                className="text-black text-sm"
              >
                Passport Expiry Date
              </label>
              <input
                type="date"
                id="passport_expiry_date"
                name="passport_expiry_date"
                disabled={!editMode}
                value={passengerData.passport_expiry_date}
                onChange={(e) =>
                  setPassengerData((prevData) => ({
                    ...prevData,
                    passport_expiry_date: e.target.value,
                  }))
                }
                min={
                  passengerData.passport_issued_date ||
                  new Date().toISOString().split("T")[0]
                }
                className="input-field rounded-md mt-4 w-full"
              />
            </div>

            <PassportImageUpload
              imagePreview={imagePreview}
              passportImage={passengerData.passport_image}
              onFileChange={handleFileChange}
              onRemoveImage={handleRemoveImage}
              isDisabled={!editMode}
              error={errors.passport_image}
            />
          </div>
        </div>
        {editMode && (
          <div className="relative flex justify-center items-center">
            {selectedCompanion && (
              <Button
                color={"#00529B"}
                padding="12px"
                width="100%"
                onClick={handleSubmitPassport}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Passport"}
              </Button>
            )}
          </div>
        )}
      </div>
      {isAddingCompanion && !selectedCompanion && (
        <div className="relative flex justify-center items-center">
          <Button
            color={"#51A951"}
            padding="12px"
            width="100%"
            onClick={handleSubmitNewCompanion}
            disabled={isSubmitting}
          >
            Add Companion
          </Button>
        </div>
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

export default PassportForm;
