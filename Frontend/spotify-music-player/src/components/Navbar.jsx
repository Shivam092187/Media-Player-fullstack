import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => (
  <nav className="bg-gray-900 p-4 flex justify-between items-center text-white shadow">
    
    {/* Logo */}
    <div className="font-bold text-xl text-green-400">
      🎵 MusicApp
    </div>

    {/* Right Side */}
    <div className="flex gap-4 items-center">
      
      {!user ? (
        <>
          <Link to="/login" className="hover:text-green-400">Login</Link>
          <Link to="/register" className="hover:text-green-400">Register</Link>
        </>
      ) : (
        <>
          {/* User Info */}
          <span className="text-sm text-gray-300">
            {user.name} ({user.role})
          </span>

          {/* Dashboard Links */}
          {user.role === "artist" ? (
            <Link to="/artist" className="hover:text-green-400">
              Dashboard
            </Link>
          ) : (
            <Link to="/user" className="hover:text-green-400">
              Home
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={onLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </nav>
);

export default Navbar;