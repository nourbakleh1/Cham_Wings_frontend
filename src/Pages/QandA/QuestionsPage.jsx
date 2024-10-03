import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Question from ".//Components/Question";
import Answer from ".//Components/Answer";
import QuestionForm from ".//Components/QuestionForm";
import { privateRequest } from "../../lib/privateRequest";
import Headings from "../../Components/Headings/Headings";
import Pagination from "../../../src/Components/Pagination/Pagination";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editQuestionText, setEditQuestionText] = useState("");
  const [employeeIds, setEmployeeIds] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [totalQuestions, setTotalQuestions] = useState(0); // Total number of questions
  const perPage = 15; // Set the number of questions per page

  const { user } = useSelector((state) => state.auth);
  const role = user?.data?.user?.employee?.roles[0]?.role_id;
  const passengerId = user?.data?.user?.passenger?.passenger_id; 

  const fetchQuestions = async () => {
    try {
      const response = await privateRequest.get(
        `/api/questions?page=${page}&limit=${perPage}`
      );
      const questionsData = response.data.data.data;
      const total = response.data.data.total; // Get total number of questions

      if (Array.isArray(questionsData)) {
        setQuestions(questionsData);
        setTotalQuestions(total); // Set total number of questions

        // Set employee IDs and answers correctly
        const employeeIds = questionsData.map(
          (q) => q.employee?.employee_id || null
        );
        setEmployeeIds(employeeIds);
      } else {
        setQuestions([]);
      }

      console.log("Fetched questions:", response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions");
    }
  };

  useEffect(() => {
    fetchQuestions(); // Initial fetch
    const intervalId = setInterval(fetchQuestions, 2000); // Refresh every 2 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const handleEditQuestion = async (faq_id) => {
    if (!editQuestionText.trim()) return;

    try {
      const response = await privateRequest.put(`/api/questions/${faq_id}`, {
        question: editQuestionText,
      });

      if (response.status === 200) {
        fetchQuestions(); // Refresh the questions list after editing
        setEditingQuestionId(null); // Exit edit mode
        setEditQuestionText(""); // Clear input
      } else {
        throw new Error("Failed to update question");
      }
    } catch (error) {
      console.error("Error updating question:", error);
      setError("Failed to update question");
    }
  };

  const handleDeleteQuestion = async (faq_id) => {
    try {
      const response = await privateRequest.delete(`/api/questions/${faq_id}`);

      if (response.status === 200) {
        fetchQuestions(); // Refresh questions after delete
      } else {
        throw new Error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      setError("Failed to delete question");
    }
  };

  // Calculate total pages and ceil Round a number up.
  const totalPages = Math.ceil(totalQuestions / perPage);

  return (
    <div className={role != undefined  && "lg:w-[calc(100%-296px)] ml-0 sm:ml-auto"}>
    <div className="container p-8 mx-auto pl-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen relative">
     
      {error && (
        <p className="text-red-600 text-center mb-6 font-medium">{error}</p>
      )}
      <div className="space-y-8 pb-24">
        <div className="mt-24">
          <Headings element={"h1"}>Questions & Answers</Headings>
        </div>
        <h1 className="ml-3 pt-4 text-lg font-bold">
          Ask any Question you want{" "}
          <span className="text-blue-500">Cham Wings Team</span> will Answer
          you.
        </h1>
        {questions?.length > 0
          ? questions?.map((q) => (
              <div
                key={q.faq_id}
                className="bg-white p-6 shadow-lg rounded-xl transition duration-300 hover:shadow-xl"
              >
                <div className="mb-6">
                  {editingQuestionId === q.faq_id ? (
                    <div>
                      <input
                        type="text"
                        value={editQuestionText}
                        onChange={(e) => setEditQuestionText(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        onClick={() => handleEditQuestion(q.faq_id)}
                        className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingQuestionId(null); // Cancel editing by resetting the editingQuestionId null
                          setEditQuestionText("");
                        }}
                        className="ml-2 bg-gray-500 text-white p-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 pl-2 py-2 text-sm">
                          Asked by: {q?.passenger?.travel_requirement?.first_name}{" "}
                          {q?.passenger?.travel_requirement?.last_name}
                        </p>
                        <p className="text-gray-600 pr-2 py-2 text-sm">
                          {q.created_at
                            ? `${new Date(q.created_at).toLocaleDateString(
                                "en-GB"
                              )} ${new Date(q.created_at).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}`
                            : "Unknown"}
                        </p>
                      </div>
                      <Question
                        question={q.question}
                        faq_id={q.faq_id}
                        onEdit={
                          // Check if employeeIds is empty OR the employee's ID is not in employeeIds to let user edit question
                          (employeeIds.length === 0 ||
                            !employeeIds.includes(q.employee?.employee_id)) &&
                          // Check if the passenger ID matches the question's passenger ID
                          passengerId === q.passenger_id
                            ? () => {
                                setEditingQuestionId(q.faq_id);
                                setEditQuestionText(q.question);
                              }
                            : null
                        }
                        onDelete={
                          role === undefined && q.answer === null
                            ? () => handleDeleteQuestion(q.faq_id)
                            : null
                        }
                        fetchQuestions={fetchQuestions}
                      />
                    </div>
                  )}
                </div>
                {q.answer ? (
                  <div>
                    <div className="bg-gradient-to-r from-green-200 to-green-300 text-green-900 p-5 rounded-lg shadow-md">
                      <p className="font-semibold">A: {q.answer}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 pl-2 py-2 text-sm">
                        Answered by: {q.employee?.name || "Unknown"}
                      </p>
                      <p className="text-gray-600 pr-2 py-2 text-sm">
                        {q.employee?.created_at // Check if 'created_at' exists in 'employee'
                          ? `${new Date( // Create a new Date object with 'created_at' for Date
                              q.employee.created_at
                              // Format the date to 'DD/MM/YYYY'
                            ).toLocaleDateString("en-GB")} ${new Date( // Create another Date object for time
                              q.employee.created_at
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                ) : replyingTo === q.faq_id ? (
                  <Answer
                    faq_id={q.faq_id}
                    refreshQuestions={fetchQuestions}
                    onCancel={() => setReplyingTo(null)}
                  />
                ) : (
                  (role == 18  || role == 5)  && (
                    <button
                      onClick={() => setReplyingTo(q.faq_id)}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                        />
                      </svg>
                      Reply
                    </button>
                  )
                )}
              </div>
            ))
          : page <= totalPages && (
              <p className="text-gray-600 text-center text-lg font-medium">
                No questions available on this page.
              </p>
            )}
      </div>

      {/* Pagination Component */}
      {totalQuestions > 0 && (
        <Pagination
          page={page - 1}
          setPage={setPage}
          totalElement={totalQuestions}
          perPage={perPage}
        />
      )}

      {role === undefined && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg p-4 z-50">
          <QuestionForm refreshQuestions={fetchQuestions} />
        </div>
      )}
    </div>
    </div>
  );
};

export default QuestionsPage;
