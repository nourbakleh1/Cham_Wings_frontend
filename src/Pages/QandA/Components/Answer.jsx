import React, { useState } from "react";
import { privateRequest } from "../../../lib/privateRequest";
import Button from "../../../Components/Button/Button";

const Answer = ({ faq_id, refreshQuestions, onCancel }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default page refresh on form submission

    const trimmedAnswer = answer.trim();
    if (!trimmedAnswer) return; // Early return if the answer is empty or only spaces

    // Optimistically update the UI before the network request
    setAnswer(""); // Clear the input field immediately for a faster UI experience

    try {
      // Send the request to the server
      await privateRequest.put(`/api/questions/${faq_id}/answer`, {
        answer: trimmedAnswer,
      });

      // Trigger a refresh to load updated questions after successful submission
      refreshQuestions();
    } catch (error) {
      // Handle error: restore previous answer or show an error message
      console.error("Error submitting answer:", error);
      setAnswer(trimmedAnswer); // Restore the input field in case of error
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
          <Button color={"#A53E47"} padding="12px" onClick={onCancel}>
            {"Cancel"}
          </Button>
          <Button
            type="submit" // Important to prevent default form submission
            color={"#00529B"}
            padding="12px"
          >
            {"Submit Answer"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Answer;
