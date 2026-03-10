import { useState } from "react";
import axios from "axios";

function AddQuestion() {

  const [quizId, setQuizId] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const token = localStorage.getItem("token");

  const handleAdd = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/admin/add-question/${quizId}`,
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

    } catch (err) {
      alert("Error Adding Question ❌");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">📝 Add Question</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-[500px]">

        <input
          type="number"
          placeholder="Quiz ID"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input
          type="text"
          placeholder="Question"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input type="text" placeholder="Option A" value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
          className="border p-2 w-full mb-2" />

        <input type="text" placeholder="Option B" value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
          className="border p-2 w-full mb-2" />

        <input type="text" placeholder="Option C" value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
          className="border p-2 w-full mb-2" />

        <input type="text" placeholder="Option D" value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
          className="border p-2 w-full mb-2" />

        <input
          type="text"
          placeholder="Correct Answer (A/B/C/D)"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          Add Question
        </button>

      </div>
    </div>
  );
}

export default AddQuestion;