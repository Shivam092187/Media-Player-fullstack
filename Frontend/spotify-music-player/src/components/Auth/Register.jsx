import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!username || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await API.post("/api/auth/register", {
        username,
        email,
        password,
        role,
      });

      alert("Registration successful! Please login.");

      // ✅ Redirect only to login (NO auto login)
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-800 p-8 rounded-2xl text-white w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-3 rounded bg-gray-700"
        >
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 py-3 rounded font-semibold hover:bg-green-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;