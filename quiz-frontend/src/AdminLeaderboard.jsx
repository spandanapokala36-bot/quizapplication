import { useEffect, useState } from "react";
import axios from "axios";

function AdminLeaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);
  const [quizId, setQuizId] = useState("");

  // ✅ LIVE BACKEND URL
  const BASE_URL = "https://quiz-backend-y1i8.onrender.com";

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/quiz/${quizId}/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeaderboard(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load leaderboard ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        🏆 Quiz Leaderboard
      </h1>

      <div className="flex items-center gap-3 mb-8">
        <input
          type="number"
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={fetchLeaderboard}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg
                     hover:bg-indigo-700 transition shadow"
        >
          Load
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center">No data available</p>
        ) : (
          <div className="space-y-4">

            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl
                            border hover:shadow-md transition
                            ${index === 0 ? "bg-yellow-50 border-yellow-300" : ""}
                            ${index === 1 ? "bg-gray-100 border-gray-300" : ""}
                            ${index === 2 ? "bg-orange-50 border-orange-300" : ""}`}
              >

                <div className="flex items-center gap-4">

                  <div className="text-xl font-bold w-8">
                    {user.rank === 1 && "🥇"}
                    {user.rank === 2 && "🥈"}
                    {user.rank === 3 && "🥉"}
                    {user.rank > 3 && `#${user.rank}`}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {user.email}
                    </p>
                  </div>

                </div>

                <div className="text-indigo-600 font-semibold">
                  {user.score} pts
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminLeaderboard;