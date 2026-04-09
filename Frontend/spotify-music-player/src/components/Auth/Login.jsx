import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

const Login = ({ setUser }) => {
  const [loginField, setLoginField] = useState(""); // email OR username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!loginField || !password) return alert("Please fill all fields!");

  const data = {
    email: loginField,
    username: loginField,
    password,
  };

  try {
    const res = await loginUser(data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
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
          value={loginField}
          onChange={(e) => setLoginField(e.target.value)}
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