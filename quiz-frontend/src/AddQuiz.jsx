import { useState } from "react";
import axios from "axios";

function AddQuiz() {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/admin/create-quiz",
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

      alert("Quiz Created Successfully ✅");
      setTitle("");
      setDuration("");

    } catch (err) {
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