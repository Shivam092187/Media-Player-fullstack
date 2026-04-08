import React, { useState } from "react";
import API from "../../services/api";

const CreateSong = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Please enter title and select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("music", file);

    try {
      setLoading(true);

      const res = await API.post("/music/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Upload successful!");

      setTitle("");
      setFile(null);

      if (onUpload) onUpload();

    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      
      <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-800">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-400">🎵 Upload Song</h2>
          <p className="text-gray-400 text-sm mt-1">
            Share your music with the world
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Title */}
          <input
            type="text"
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-5 text-center hover:border-green-500 transition">
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="cursor-pointer text-gray-400">
               Click to select audio file
            </label>

            {file && (
              <p className="text-green-400 text-sm mt-2">
                {file.name}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-lg font-semibold text-lg transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/20"
            }`}
          >
            {loading ? "Uploading..." : "Upload Song"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateSong;