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
  const [loading, setLoading] = useState(true);

  //  AUTH CHECK ON APP LOAD
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await API.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  //  LOGOUT
  const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout");
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  //  LOADING SCREEN (IMPORTANT)
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Navbar only after auth check */}
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>

        {/* HOME REDIRECT */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "artist" ? (
                <Navigate to="/artist" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Register setUser={setUser} />
            )
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/user"
          element={
            user?.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ARTIST DASHBOARD */}
        <Route
          path="/artist"
          element={
            user?.role === "artist" ? (
              <ArtistDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* UPLOAD SONG */}
        <Route
          path="/upload"
          element={
            user?.role === "artist" ? (
              <CreateSong />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* MY SONGS */}
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

        {/* ANALYTICS */}
        <Route
          path="/analytics"
          element={
            user?.role === "artist" ? (
              <Analytics />
            ) : (
              <Navigate to="/login" />
            )
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