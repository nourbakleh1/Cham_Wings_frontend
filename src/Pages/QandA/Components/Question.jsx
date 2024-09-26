import React, { useState } from "react";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { privateRequest } from "../../../lib/privateRequest";

const Question = ({ question, faq_id, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = async () => {
    if (onEdit) {
      await onEdit(faq_id);
    }
  };

  const handleDelete = async () => {
    try {
      await privateRequest.delete(`/api/questions/${faq_id}`);
      if (onDelete) {
        onDelete(faq_id);
      }
      toast.success("Question deleted successfully.");
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Sorry, you passed the time for delete.");
    } finally {
      setIsModalOpen(false); // Close the modal regardless of success or failure
    }
  };

  return (
    <div className="flex justify-between items-center mb-4 group">
      <div className="bg-blue-100 text-blue-800 p-4 rounded-lg max-w-lg shadow-md flex-grow transition-all duration-300">
        <p className="font-semibold">Q: {question}</p>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        {onEdit && (
          <button
            onClick={handleEdit}
            className="text-yellow-500 hover:text-yellow-600 transition duration-200 p-2 rounded-full hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            aria-label="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-red-500 hover:text-red-600 transition duration-200 p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        )}
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Question;
