import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const Login = ({ setUser }) => {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!loginInput || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        loginInput,
        password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Set user
      setUser(res.data.user);

      // ✅ Redirect based on role
      navigate(res.data.user.role === "artist" ? "/artist" : "/user");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-800 p-8 rounded-2xl text-white w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="text"
          placeholder="Email or Username"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="bg-green-500 py-3 rounded font-semibold hover:bg-green-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;