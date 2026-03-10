import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QuizPage() {

  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get(
      `http://localhost:8080/api/quiz/${quizId}/questions`,
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

  }, []);

  const handleSelect = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const submitQuiz = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/quiz/${quizId}/submit`,
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
      alert("Error submitting quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        📝 Quiz
      </h1>

      {questions.map((q) => (
        <div key={q.id} className="bg-white p-6 rounded-xl shadow-md mb-6">

          <h2 className="font-semibold mb-4">
            {q.questionTitle}
          </h2>

          <div className="space-y-2">
            {["A", "B", "C", "D"].map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(q.id, opt)}
                className={`block w-full text-left px-4 py-2 rounded border ${
                  answers[q.id] === opt
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {opt}. {q[`option${opt}`]}
              </button>
            ))}
          </div>

        </div>
      ))}

      <button
        onClick={submitQuiz}
        className="bg-green-500 text-white px-6 py-3 rounded"
      >
        Submit Quiz
      </button>

    </div>
  );
}

export default QuizPage;