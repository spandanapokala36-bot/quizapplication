import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QuizPage() {

  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const token = localStorage.getItem("token");

  // ✅ LIVE BACKEND URL
  const BASE_URL = "https://quiz-backend-y1i8.onrender.com";

  useEffect(() => {

    axios.get(
      `${BASE_URL}/api/quiz/${quizId}/questions`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      setQuestions(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  }, [quizId, token]);

  const handleSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const submitQuiz = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/quiz/${quizId}/submit`,
        answers,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data);
      window.location.href = `/dashboard`;

    } catch (error) {
      console.error(error);
      alert("Error submitting quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">

      <div className="w-64 bg-white border-r p-6 hidden md:block">

        <h2 className="text-xl font-bold text-indigo-600 mb-6">
          Quiz Progress
        </h2>

        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium
                ${answers[q.id] ? "bg-indigo-600 text-white" : "bg-gray-200"}
              `}
            >
              {index + 1}
            </div>
          ))}
        </div>

      </div>

      <div className="flex-1 p-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            📝 Quiz
          </h1>
          <p className="text-gray-500">
            Answer all questions and submit
          </p>
        </div>

        <div className="space-y-8">

          {questions.map((q, index) => (
            <div
              key={q.id}
              className="bg-white p-6 rounded-2xl border border-gray-200
                         shadow-sm hover:shadow-lg transition-all duration-300
                         hover:-translate-y-1"
            >

              <div className="flex items-center justify-between mb-4">
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                  Question {index + 1}
                </span>

                {answers[q.id] && (
                  <span className="text-green-500 text-sm font-medium">
                    Answered ✓
                  </span>
                )}
              </div>

              <h2 className="font-semibold mb-5 text-gray-800 text-lg">
                {q.questionTitle}
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {["A", "B", "C", "D"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(q.id, opt)}
                    className={`flex items-center px-4 py-3 rounded-xl border transition-all duration-200
                      ${
                        answers[q.id] === opt
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                          : "bg-gray-50 hover:bg-indigo-50 hover:border-indigo-400"
                      }
                    `}
                  >
                    <span className="font-bold mr-3">{opt}.</span>
                    {q[`option${opt}`]}
                  </button>
                ))}
              </div>

            </div>
          ))}

        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={submitQuiz}
            className="bg-gradient-to-r from-green-500 to-emerald-500
                       text-white px-6 py-3 rounded-xl font-medium
                       hover:scale-105 active:scale-95
                       transition-all duration-200 shadow-lg"
          >
            Submit Quiz 🚀
          </button>
        </div>

      </div>
    </div>
  );
}

export default QuizPage;