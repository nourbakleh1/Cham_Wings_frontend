import React, { useState } from "react";
import { privateRequest } from "../../lib/privateRequest";
import Button from "../../Components/Button/Button";

const Answer = ({ faq_id, refreshQuestions, onCancel }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return; // If the answer is empty or only spaces, return early and do nothing

    try {
      await privateRequest.put(`/api/questions/${faq_id}/answer`, { answer });
      setAnswer(""); // Clear the input after successful submission
      refreshQuestions(); // Trigger a refresh to load updated questions after submission
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
        <div className="relative mb-4">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-32 border-2 border-gray-200 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 ease-in-out resize-none bg-white shadow-inner"
          />
          <div className="absolute bottom-3 right-3 text-gray-400 text-sm">
          {/* Shows the current length of the answer, limiting to 500 characters */}
            {answer.length}/500
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            color={"#A53E47"}
            padding="12px"
            // width="100%"
            onClick={onCancel}
            // disabled={isSubmitting}
          >
            {"Cancel"}
          </Button>
          {/* <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md"
          >
            Submit Answer
          </button> */}
          <Button
            color={"#00529B"}
            padding="12px"
            // width="100%"
            // onClick={handleSubmit}
          >
            {"Submit Answer"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Answer;
