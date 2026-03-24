import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import QuizPage from "./QuizPage";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AddQuiz from "./AddQuiz";
import AddQuestion from "./AddQuestion";
import AdminLeaderboard from "./AdminLeaderboard";

function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER ROUTES */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/quiz/:quizId"
        element={
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        }
      />

      {/* USER LEADERBOARD (optional) */}
      <Route
        path="/leaderboard"
        element={
          <PrivateRoute>
            <AdminLeaderboard />
          </PrivateRoute>
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="ROLE_ADMIN">
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* ADD QUIZ */}
      <Route
        path="/admin/add-quiz"
        element={
          <PrivateRoute requiredRole="ROLE_ADMIN">
            <AddQuiz />
          </PrivateRoute>
        }
      />

      {/* 🔥 ADD QUESTION (FIXED ROUTE WITH quizId) */}
      <Route
        path="/admin/add-question/:quizId"
        element={
          <PrivateRoute requiredRole="ROLE_ADMIN">
            <AddQuestion />
          </PrivateRoute>
        }
      />

      {/* ADMIN LEADERBOARD */}
      <Route
        path="/admin/leaderboard"
        element={
          <PrivateRoute requiredRole="ROLE_ADMIN">
            <AdminLeaderboard />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;