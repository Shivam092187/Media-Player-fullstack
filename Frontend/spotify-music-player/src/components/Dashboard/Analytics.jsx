import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/music/analytics")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl mb-6">📊 Analytics</h2>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-gray-800 p-4 rounded">
          <p>Total Songs</p>
          <h3 className="text-xl">{data.totalSongs}</h3>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <p>Total Plays</p>
          <h3 className="text-xl">{data.totalPlays}</h3>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <p>Top Song</p>
          <h3 className="text-xl">
            {data.topSong?.title || "N/A"}
          </h3>
        </div>

      </div>

      {/* Songs */}
      <div>
        <h3 className="text-xl mb-3">🎵 Song Performance</h3>

        {data.songs.map(song => (
          <div
            key={song._id}
            className="bg-gray-800 p-3 mb-2 rounded flex justify-between"
          >
            <span>{song.title}</span>
            <span>▶ {song.plays} plays</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;