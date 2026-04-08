import React, { useEffect, useState } from "react";
import { getAllSongs, playSong } from "../../services/api";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await getAllSongs();
        setSongs(res.data.musics);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSongs();
  }, []);

  const handlePlay = async (song) => {
    try {
      const res = await playSong(song._id);
      setCurrentSong(res.data.uri);
      setPlayingId(song._id);
    } catch (err) {
      console.error("PLAY ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-green-400">
        🎵 Music Library
      </h2>

      {/* Song List */}
      <div className="space-y-3">
        {songs.map((song) => (
          <div
            key={song._id}
            className={`flex items-center justify-between p-4 rounded-xl transition-all 
            ${playingId === song._id 
              ? "bg-green-600/20 border border-green-500" 
              : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {/* Song Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                🎵
              </div>
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-400">
                  {song.plays || 0} plays
                </p>
              </div>
            </div>

            {/* Play Button */}
            <button
              onClick={() => handlePlay(song)}
              className={`px-4 py-2 rounded-full font-semibold transition 
              ${playingId === song._id 
                ? "bg-green-500" 
                : "bg-gray-600 hover:bg-green-500"}`}
            >
              {playingId === song._id ? "Playing..." : "Play"}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 p-4">
          <audio controls autoPlay src={currentSong} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default SongList;