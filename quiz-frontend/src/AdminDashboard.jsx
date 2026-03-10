import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Bar */}
      <div className="flex justify-between items-center bg-indigo-600 text-white p-6">
        <h1 className="text-2xl font-bold">⚙️ Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Admin Options */}
      <div className="p-10 grid grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/admin/add-quiz")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold">➕ Add Quiz</h2>
          <p className="text-gray-500 mt-2">Create a new quiz</p>
        </div>

        <div
          onClick={() => navigate("/admin/add-question")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold">📝 Add Questions</h2>
          <p className="text-gray-500 mt-2">Add questions to quiz</p>
        </div>

        <div
          onClick={() => navigate("/admin/leaderboard")}
          className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold">🏆 View Leaderboard</h2>
          <p className="text-gray-500 mt-2">Check quiz rankings</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;