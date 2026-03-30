import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const token = localStorage.getItem("token");

  // ✅ LIVE BACKEND URL
  const BASE_URL = "https://quiz-backend-y1i8.onrender.com";

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/create-quiz`,
        {
          title: title,
          durationMinutes: duration
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const quizId = response.data.id;

      alert("Quiz Created Successfully ✅");

      // 👉 Redirect with quizId
      navigate(`/admin/add-question/${quizId}`);

    } catch (err) {
      console.error(err);
      alert("Error Creating Quiz ❌");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">➕ Create Quiz</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">

        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          Create Quiz
        </button>

      </div>
    </div>
  );
}

export default AddQuiz;