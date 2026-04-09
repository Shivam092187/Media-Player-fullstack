import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if ((!trimmedEmail && !trimmedUsername) || !trimmedPassword) {
      return alert("Please fill email or username and password!");
    }

    try {
      // ONLY ONE FIELD SEND (IMPORTANT)
      const data = {
        password: trimmedPassword,
      };

      if (trimmedEmail) {
        data.email = trimmedEmail;
      } else {
        data.username = trimmedUsername;
      }

      console.log("LOGIN DATA:", data); // 🔍 debug

      const res = await loginUser(data);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      navigate(res.data.user.role === "artist" ? "/artist" : "/user");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded bg-gray-700"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded bg-gray-700"
        />

        <button className="bg-green-500 py-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;