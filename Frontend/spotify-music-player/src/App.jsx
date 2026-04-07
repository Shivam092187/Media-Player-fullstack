// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UserDashboard from "./components/Dashboard/UserDashboard";
import ArtistDashboard from "./components/Dashboard/ArtistDashboard";
import Navbar from "./components/Navbar";

import CreateSong from "./components/Songs/CreateSong";
import SongList from "./components/Songs/SongList";
import Analytics from "./components/Dashboard/Analytics"; 

import API from "./services/api";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>

        {/* Home Redirect */}
        <Route
          path="/"
          element={
            user
              ? user.role === "artist"
                ? <Navigate to="/artist" />
                : <Navigate to="/user" />
              : <Navigate to="/login" />
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={
            user?.role === "user"
              ? <UserDashboard />
              : <Navigate to="/login" />
          }
        />

        {/* Artist Dashboard */}
        <Route
          path="/artist"
          element={
            user?.role === "artist"
              ? <ArtistDashboard />
              : <Navigate to="/login" />
          }
        />

        {/* Upload Song */}
        <Route
          path="/upload"
          element={
            user?.role === "artist"
              ? <CreateSong />
              : <Navigate to="/login" />
          }
        />

        {/* My Songs */}
        <Route
          path="/mysongs"
          element={
            user?.role === "artist" ? (
              <div className="min-h-screen bg-gray-900 text-white p-6">
                <h2 className="text-2xl mb-4">🎤 My Songs</h2>
                <SongList />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔥 NEW: Analytics */}
        <Route
          path="/analytics"
          element={
            user?.role === "artist"
              ? <Analytics />
              : <Navigate to="/login" />
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <h2 className="text-center mt-10 text-red-600 text-3xl">
              404 Page Not Found
            </h2>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;