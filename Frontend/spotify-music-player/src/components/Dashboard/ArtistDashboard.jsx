import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">🎤 Artist Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Upload Song */}
        <div className="bg-gray-800 p-5 rounded-xl shadow">
          <h3 className="text-xl mb-2">Upload Song</h3>
          <button
            onClick={() => navigate("/upload")}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Go to Upload
          </button>
        </div>

        {/* My Songs */}
        <div className="bg-gray-800 p-5 rounded-xl shadow">
          <h3 className="text-xl mb-2">My Songs</h3>
          <button
            onClick={() => navigate("/mysongs")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            View Songs
          </button>
        </div>

        {/*  Analytics */}
        <div className="bg-gray-800 p-5 rounded-xl shadow">
          <h3 className="text-xl mb-2">Analytics</h3>
          <button
            onClick={() => navigate("/analytics")}
            className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
          >
            View Analytics
          </button>
        </div>

      </div>
    </div>
  );
};

export default ArtistDashboard;