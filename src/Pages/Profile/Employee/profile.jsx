import React, { useState, useEffect } from "react";
import PersonalInfoForm from "./PersonalInfoForm.jsx";
import { privateRequest } from "../../../lib/privateRequest.js";
import Toast from "../Toast/Toast.jsx";
import "../ProfilePage.css";
import Headings from "../../../Components/Headings/Headings.jsx";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-200 bg-opacity-50 py-2">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto p-8 mt-8 mb-16 bg-white rounded-lg shadow-md">
        <div className="mt-12">
            <Headings element={"h1"}>Profile Information</Headings>
          </div>
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
            <div className="pt-4">
              <Headings element={"h3"} color="#00529B">Personal Information</Headings>
            </div>
            <PersonalInfoForm
              editMode={editMode}
              toggleEditMode={toggleEditMode}
            />
          </div>

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
