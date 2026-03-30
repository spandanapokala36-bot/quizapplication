import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AddQuestion() {

  const { quizId } = useParams(); 
  const navigate = useNavigate();

  const [questionTitle, setQuestionTitle] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const token = localStorage.getItem("token");

  // ✅ LIVE BACKEND URL
  const BASE_URL = "https://quiz-backend-y1i8.onrender.com";

  const handleAdd = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/admin/add-question/${quizId}`,
        {
          questionTitle,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Question Added Successfully ✅");

      setQuestionTitle("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("");

    } catch (err) {
      console.error(err);
      alert("Error Adding Question ❌");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      <div className="flex-1 p-10 flex justify-center items-start">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-[550px]">

          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            📝 Add Question
          </h1>

          <p className="text-gray-500 mb-6">
            Adding to Quiz ID: <span className="font-semibold">{quizId}</span>
          </p>

          <div className="space-y-3">

            <input
              type="text"
              placeholder="Enter question"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Option A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              className="border p-3 w-full rounded-lg"
            />

            <input
              type="text"
              placeholder="Option B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              className="border p-3 w-full rounded-lg"
            />

            <input
              type="text"
              placeholder="Option C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              className="border p-3 w-full rounded-lg"
            />

            <input
              type="text"
              placeholder="Option D"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              className="border p-3 w-full rounded-lg"
            />

            <input
              type="text"
              placeholder="Correct Answer (A/B/C/D)"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="border p-3 w-full rounded-lg"
            />

            <button
              onClick={handleAdd}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500
                         text-white py-3 rounded-lg font-medium
                         hover:scale-105 active:scale-95
                         transition-all duration-200 shadow-md"
            >
              Add Question
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="w-full text-indigo-600 mt-3 underline"
            >
              Done Adding Questions
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddQuestion;