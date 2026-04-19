import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 fetch analytics
  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/api/music/analytics");
      setData(res.data);
    } catch (err) {
      console.error("Analytics error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchAnalytics();

    // 🔥 listen when any song is played
    const handleSongPlayed = () => {
      fetchAnalytics(); // instant update
    };

    window.addEventListener("songPlayed", handleSongPlayed);

    return () => {
      window.removeEventListener("songPlayed", handleSongPlayed);
    };
  }, []);

  // 🔄 loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading analytics...
      </div>
    );
  }

  // ❌ no data
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        Failed to load analytics
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">📊 Analytics</h2>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Total Songs</p>
          <h3 className="text-2xl font-semibold">{data.totalSongs}</h3>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Total Plays</p>
          <h3 className="text-2xl font-semibold">{data.totalPlays}</h3>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-gray-400">Top Song</p>
          <h3 className="text-2xl font-semibold">
            {data.topSong?.title || "N/A"}
          </h3>
        </div>
      </div>

      {/* SONG LIST */}
      <div>
        <h3 className="text-xl mb-3">🎵 Song Performance</h3>

        {data.songs?.length === 0 ? (
          <p className="text-gray-400">No songs available</p>
        ) : (
          data.songs.map((song) => (
            <div
              key={song._id}
              className="bg-gray-800 p-3 mb-2 rounded flex justify-between items-center"
            >
              <span>{song.title}</span>
              <span className="text-green-400 font-semibold">
                ▶ {song.plays} plays
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Analytics;