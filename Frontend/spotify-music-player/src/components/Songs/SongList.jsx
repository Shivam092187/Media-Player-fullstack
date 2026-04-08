import React, { useEffect, useState } from "react";
import { getAllSongs, playSong } from "../../services/api";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await getAllSongs();
      setSongs(res.data.musics);
    };
    fetchSongs();
  }, []);

  const handlePlay = async (song) => {
    try {
      console.log("CLICKED PLAY:", song._id);

      const res = await playSong(song._id); 

      console.log("API RESPONSE:", res.data);

      setCurrentSong(res.data.uri); 

    } catch (err) {
      console.error("PLAY ERROR:", err);
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl mb-4">🎵 Songs</h2>

      {songs.map((song) => (
        <div key={song._id} className="mb-3">
          <span>{song.title}</span>

          <button
            onClick={() => handlePlay(song)}
            className="ml-3 bg-green-500 px-3 py-1"
          >
            Play
          </button>
        </div>
      ))}

      {/* ONLY THIS AUDIO */}
      {currentSong && (
        <audio controls autoPlay src={currentSong} />
      )}
    </div>
  );
};

export default SongList;