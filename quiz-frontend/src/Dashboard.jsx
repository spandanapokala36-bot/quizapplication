import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      navigate("/");
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

  }, [token, navigate]);

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

      navigate(`/quiz/${quizId}`);

    } catch (error) {
      alert("Unable to start quiz ❌");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
  <div className="min-h-screen flex bg-gray-100">

    {/* SIDEBAR */}
    <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">
          QuizApp
        </h1>

        <nav className="space-y-2">

          <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg">
            🏠 Dashboard
          </div>

          <div
            onClick={() => navigate("/leaderboard")}
            className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            📊 Leaderboard
          </div>

        </nav>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>

    {/* MAIN */}
    <div className="flex-1 p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500">
          Choose a quiz to start learning
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-xl p-6 shadow-sm
                       hover:shadow-lg transition duration-300"
          >

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {quiz.title}
            </h3>

            <p className="text-gray-500 text-sm mb-4">
              Duration: {quiz.durationMinutes} mins
            </p>

            <button
              onClick={() => startQuiz(quiz.id)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg
                         hover:bg-indigo-700 transition"
            >
              Start Quiz
            </button>

          </div>
        ))}

      </div>

    </div>
  </div>
);
}

export default Dashboard;