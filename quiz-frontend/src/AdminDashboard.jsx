import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-6 hidden md:block">

        <h1 className="text-2xl font-bold text-indigo-600 mb-10">
          Admin Panel
        </h1>

        <nav className="space-y-4">

          <p 
            onClick={() => navigate("/admin")}
            className="text-indigo-600 font-medium cursor-pointer"
          >
            ⚙ Dashboard
          </p>

          <p 
            onClick={() => navigate("/admin/add-quiz")}
            className="text-gray-700 cursor-pointer hover:text-indigo-600 transition"
          >
            ➕ Add Quiz
          </p>

          <p 
            onClick={() => navigate("/admin/add-question")}
            className="text-gray-700 cursor-pointer hover:text-indigo-600 transition"
          >
            📝 Add Questions
          </p>

          <p 
            onClick={() => navigate("/leaderboard")}
            className="text-gray-700 cursor-pointer hover:text-indigo-600 transition"
          >
            🏆 Leaderboard
          </p>

        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard
          </h2>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            👑 Admin
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Add Quiz */}
          <div
            onClick={() => navigate("/admin/add-quiz")}
            className="bg-white p-6 rounded-2xl border cursor-pointer
                       hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1
                       transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              ➕ Add Quiz
            </h2>
            <p className="text-gray-500">
              Create a new quiz
            </p>
          </div>

          {/* Add Questions */}
          <div
            onClick={() => navigate("/admin/add-question")}
            className="bg-white p-6 rounded-2xl border cursor-pointer
                       hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1
                       transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              📝 Add Questions
            </h2>
            <p className="text-gray-500">
              Add questions to quiz
            </p>
          </div>

          {/* Leaderboard */}
          <div
            onClick={() => navigate("/leaderboard")}
            className="bg-white p-6 rounded-2xl border cursor-pointer
                       hover:border-indigo-500 hover:shadow-lg hover:-translate-y-1
                       transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              🏆 View Leaderboard
            </h2>
            <p className="text-gray-500">
              Check quiz rankings
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;