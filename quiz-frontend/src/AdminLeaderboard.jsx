import { useEffect, useState } from "react";
import axios from "axios";

function AdminLeaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);
  const [quizId, setQuizId] = useState("");

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8080/api/quiz/${quizId}/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeaderboard(response.data);
    } catch (error) {
      alert("Failed to load leaderboard ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">🏆 Quiz Leaderboard</h1>

      <div className="mb-6">
        <input
          type="number"
          placeholder="Enter Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          className="px-4 py-2 border rounded mr-3"
        />
        <button
          onClick={fetchLeaderboard}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Load Leaderboard
        </button>
      </div>

      <div className="bg-white shadow rounded p-6">
        {leaderboard.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Rank</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user) => (
                <tr key={user.rank} className="border-b">
                  <td className="p-2">{user.rank}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default AdminLeaderboard;