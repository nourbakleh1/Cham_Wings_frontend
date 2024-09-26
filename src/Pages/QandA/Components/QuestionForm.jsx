import React, { useState } from "react";
import { privateRequest } from "../../../lib/privateRequest";

const QuestionForm = ({ refreshQuestions }) => {
  const [question, setQuestion] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return; // If the answer is empty or only spaces, return early and do nothing

    try {
      await privateRequest.post("/api/questions", { question });
      refreshQuestions();
      setQuestion("");
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Prevent the default behavior of the Enter key adding a new line
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg p-4"
    >
      <div className="max-w-4xl mx-auto flex items-center space-x-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here..."
          className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out shadow-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
