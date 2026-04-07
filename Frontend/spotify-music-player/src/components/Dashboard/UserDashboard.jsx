import React from "react";
import SongList from "../Songs/SongList";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">🎧 User Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Listen to your favorite songs
        </p>
      </div>

      {/* Song Section */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">All Songs</h2>
        <SongList />
      </div>

    </div>
  );
};

export default UserDashboard;