import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const url =
        role === "ADMIN"
          ? "http://localhost:8080/api/auth/register-admin"
          : "http://localhost:8080/api/auth/register-user";

      await axios.post(url, {
        email,
        password
      });

      alert("Registration Successful 🎉");
      navigate("/");

    } catch (error) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">

      <form
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]"
      >

        <h2 className="text-3xl font-bold text-center mb-8">
          Create Account ✨
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <div className="mb-6">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="USER">Register as User</option>
            <option value="ADMIN">Register as Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600"
        >
          Register
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}

export default Register;