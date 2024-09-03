import React, { useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { privateRequest } from "../../../../lib/privateRequest.js";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanionSelectDropdown = ({
  passenger,
  companions,
  selectedCompanion,
  setSelectedCompanion,
  setFormData,
  onChange,
  handleRefresh,
  toggleEditMode,
  editMode,
  setEditMode,
  isAddingCompanion,
  setIsAddingCompanion,
  setPassengerData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selected =
      companions.find(
        (c) => c.travel_requirement_id === parseInt(selectedId)
      ) || passenger;

    setSelectedCompanion(selected);
    setFormData(selected || {});
    onChange(selected);
  };

  const handleAddCompanion = () => {
    setIsAddingCompanion(true);
    setEditMode(true);
    setSelectedCompanion(null);
    setFormData({ travel_requirement: {} });

    setPassengerData({
      number: "",
      passport_issued_country: "",
      passport_issued_date: "",
      passport_expiry_date: "",
      passport_image: "",
    });

    onChange(null);
  };

  const handleEditCompanion = () => {
    setEditMode(!editMode);
  };

  const handleDeleteCompanion = async () => {
    try {
      const travel_requirement_id = selectedCompanion?.travel_requirement_id;
      if (!travel_requirement_id)
        throw new Error("Travel requirement ID is missing");

      const response = await privateRequest.delete(
        `/api/passengers/${travel_requirement_id}`
      );
      if (response.data.success) {
        handleRefresh();
        setIsModalOpen(false); // Close modal after deletion
        toast.success("Companion deleted successfully!");
      } else {
        console.error("Failed to delete companion.");
        toast.error("Failed to delete companion.");
      }
    } catch (error) {
      console.error(`An error occurred while deleting: ${error.message}`);
      toast.error(`An error occurred while deleting: ${error.message}`);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full mx-auto my-4">
      <label
        htmlFor="companion-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select Companion
      </label>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
        <div className="relative flex-grow mb-4 md:mb-0">
          <select
            id="companion-select"
            value={selectedCompanion?.travel_requirement_id || ""}
            onChange={handleSelectChange}
            className="block w-full px-4 py-3 pr-8 text-base text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out hover:border-gray-400 cursor-pointer"
          >
            {passenger && (
              <option
                key={passenger.travel_requirement_id}
                value={passenger.travel_requirement_id}
                className="py-2 px-4"
              >
                {passenger.travel_requirement.first_name}{" "}
                {passenger.travel_requirement.last_name}
              </option>
            )}
            {companions.map((companion) => (
              <option
                key={companion?.travel_requirement_id}
                value={companion?.travel_requirement_id}
                className="py-2 px-4"
              >
                {companion?.travel_requirement?.first_name || ""}{" "}
                {companion?.travel_requirement?.last_name || ""}
              </option>
            ))}
            {!companions.length && (
              <option value="" className="py-2 px-4 text-gray-500 italic">
                No companions available
              </option>
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleAddCompanion}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleEditCompanion}
            className={`p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              !selectedCompanion ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!selectedCompanion}
          >
            {editMode ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <PencilSquareIcon className="w-5 h-5" />
            )}
          </button>
          {selectedCompanion && (
            <button
              onClick={openModal}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this companion? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCompanion}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CompanionSelectDropdown.propTypes = {
  passenger: PropTypes.object,
  companions: PropTypes.array.isRequired,
  selectedCompanion: PropTypes.object,
  setSelectedCompanion: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default CompanionSelectDropdown;
