import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

const Login = ({ setUser }) => {
  const [input, setInput] = useState(""); // email OR username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input || !password) {
      return alert("Please fill all fields");
    }

    try {
      // check: email hai ya username
      const payload = {
        password: password,
        ...(input.includes("@")
          ? { email: input }
          : { username: input }),
      };

      const res = await loginUser(payload);

      // save token
      localStorage.setItem("token", res.data.token);

      // user store in state
      setUser(res.data.user);

      // redirect
      if (res.data.user.role === "artist") {
        navigate("/artist");
      } else {
        navigate("/user");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl text-white w-80"
      >
        <h2 className="text-xl mb-4">Login</h2>

        {/* EMAIL OR USERNAME */}
        <input
          type="text"
          placeholder="Email or Username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />

        <button className="w-full bg-green-500 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;