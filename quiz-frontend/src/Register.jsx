import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  // ✅ LIVE BACKEND URL
  const BASE_URL = "https://quiz-backend-y1i8.onrender.com";

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      // ✅ Fix 1: Wake up backend (Render sleep issue)

      const url =
        role === "ADMIN"
          ? `${BASE_URL}/api/auth/register-admin`
          : `${BASE_URL}/api/auth/register-user`;

      // ✅ Fix 2: Add credentials for CORS
      await axios.post(
        url,
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      );

      alert("Registration Successful 🎉");
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">

      <div className="hidden md:flex w-1/2 items-center justify-center p-10 text-white relative overflow-hidden">
        
        <div className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10 blur-3xl"></div>
        <div className="absolute w-72 h-72 bg-purple-300/20 rounded-full bottom-10 right-10 blur-3xl"></div>

        <div className="relative z-10 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-4">Quiz App</h1>
          <p className="text-lg opacity-90">
            Join now and start your journey of learning and competition.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-white/80 backdrop-blur-sm">

        <form
          onSubmit={handleRegister}
          className="bg-white p-10 rounded-2xl shadow-xl w-[380px] animate-slideUp"
        >

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create your account
          </h2>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:scale-[1.02] transition-all duration-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:scale-[1.02] transition-all duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-1">
              Register as
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         transition-all duration-200"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       text-white py-2 rounded-lg font-medium
                       hover:scale-105 active:scale-95
                       transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Register
          </button>

          <p className="text-sm text-gray-600 mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;