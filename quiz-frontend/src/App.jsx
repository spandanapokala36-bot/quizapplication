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
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected User Routes */}
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
    <Route 
  path="/admin/leaderboard" 
  element={
    <PrivateRoute requiredRole="ROLE_ADMIN">
      <AdminLeaderboard />
    </PrivateRoute>
  } 
/>
      {/* Protected Admin Route */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="ROLE_ADMIN">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/admin/add-quiz" element={<AddQuiz />} />
<Route path="/admin/add-question" element={<AddQuestion />} />
    </Routes>
  );
}

export default App;