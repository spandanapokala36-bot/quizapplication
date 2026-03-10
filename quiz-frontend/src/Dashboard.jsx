import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [quizzes, setQuizzes] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      window.location.href = "/";
      return;
    }

    axios.get("http://localhost:8080/api/quiz/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setQuizzes(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  }, []);
  const startQuiz = async (quizId) => {
  try {
    await axios.get(
      `http://localhost:8080/api/quiz/${quizId}/start`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    window.location.href = `/quiz/${quizId}`;

  } catch (error) {
    alert("Unable to start quiz");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          📚 Available Quizzes
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {quizzes.map((quiz) => (
          <div key={quiz.id}
               className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-xl font-semibold mb-3">
              {quiz.title}
            </h2>

            <p className="text-gray-600 mb-4">
              Duration: {quiz.durationMinutes} minutes
            </p>

            <button
  onClick={() => startQuiz(quiz.id)}
  className="bg-indigo-500 text-white px-4 py-2 rounded"
>
  Start Quiz
</button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;