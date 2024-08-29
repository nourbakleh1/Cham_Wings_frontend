import React, { useState, useEffect } from "react";
import PersonalInfoForm from "./Components/PersonalInfoForm";
import PassportInfoForm from "./Components/PassportInfoForm";
import CompanionSelect from "./Components/CompanionSelect";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [editModePassport, setEditModePassport] = useState(false);
  const [editModeCompanion, setEditModeCompanion] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const toggleEditModePassport = () => {
    setEditModePassport((prevState) => !prevState);
  };

  const toggleEditModeCompanion = () => {
    setEditModeCompanion((prevState) => !prevState);
  };

  const handleCompanionChange = (companion) => {
    setSelectedCompanion(companion);
  };

  return (
    <div className="bg-gray-200 bg-opacity-50 py-2">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-8 mt-8 mb-16 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-8 pt-8 text-center border-b-2 border-gray-300 py-4">
            Profile Information
          </h1>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={toggleEditMode}
                className="ml-auto text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                <i className={`fas ${editMode ? "fa-times" : "fa-edit"}`}></i>
                {editMode ? " Cancel" : " Edit"}
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 pb-8">
              Personal Information
            </h2>
            <PersonalInfoForm editMode={editMode} />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={toggleEditModePassport}
                className="ml-auto text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                <i
                  className={`fas ${editModePassport ? "fa-times" : "fa-edit"}`}
                ></i>
                {editModePassport ? " Cancel" : " Edit"}
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 pb-8">
              Passport Information
            </h2>
            <PassportInfoForm
              editModePassport={editModePassport}
              toggleEditMode={toggleEditModePassport}
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={toggleEditModeCompanion}
                className="ml-auto text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                <i
                  className={`fas ${
                    editModeCompanion ? "fa-times" : "fa-edit"
                  }`}
                ></i>
                {editModeCompanion ? " Cancel" : " Edit"}
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 pb-8">
              Companion Information
            </h2>
            <CompanionSelect
              editMode={editModeCompanion}
              value={selectedCompanion}
              onChange={handleCompanionChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
