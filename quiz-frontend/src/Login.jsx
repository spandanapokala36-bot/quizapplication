import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      const token = response.data;

      localStorage.setItem("token", token);

      // 🔥 Decode token
      const decoded = jwtDecode(token);

      // 🔥 IMPORTANT: Check what backend is sending
      console.log("DECODED TOKEN:", decoded);

      alert("Login Successful 🚀");

      // 🔥 Temporary redirect logic (we will fix after seeing console)
      if (decoded.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">

      <form 
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]"
      >

        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Welcome Back 👋
        </h2>

        <div className="mb-5">
          <label className="block text-gray-600 mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />
        </div>

        <div className="mb-7">
          <label className="block text-gray-600 mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600"
        >
          Login
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
}

export default Login;