const musicModel = require('../models/music.model');
const { uploadFile } = require('../services/storage.service');
const mongoose = require("mongoose");

// ✅ Upload music
const musicCreate = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File required" });

    const result = await uploadFile(req.file);

    const music = await musicModel.create({
      title: req.body.title,
      uri: result.url,
      artist: req.user.id,
      plays: 0 // 🔥 add (safe)
    });

    console.log("DEBUG - Music created:", music);

    res.status(201).json({ message: "Music created successfully", music });

  } catch (err) {
    console.error("MUSIC ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



// ✅ Get all songs
const getAllmusic = async (req, res) => {
  try {
    const musics = await musicModel.find();

    res.status(200).json({
      message: "Music fetched successfully",
      musics
    });

  } catch (err) {
    console.error("GET ALL MUSIC ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



// 🔥 NEW: Play song (increment plays)
const playSong = async (req, res) => {
  try {
    console.log("PLAY API HIT"); // 🔍 debug

    const song = await musicModel.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // 🔥 SAFE increment (IMPORTANT)
    song.plays = (song.plays || 0) + 1;

    await song.save();

    console.log("UPDATED PLAYS:", song.plays);

    res.status(200).json({
      message: "Song playing",
      uri: song.uri
    });

  } catch (err) {
    console.error("PLAY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// 🔥 NEW: Analytics
const getAnalytics = async (req, res) => {
  try {
    const songs = await musicModel.find({ artist: req.user.id });

    const totalPlays = songs.reduce((sum, s) => sum + (s.plays || 0), 0);

    const topSong = songs.length
      ? songs.reduce((prev, curr) =>
          prev.plays > curr.plays ? prev : curr
        )
      : null;

    res.status(200).json({
      totalSongs: songs.length,
      totalPlays,
      topSong,
      songs
    });

  } catch (err) {
    console.error("ANALYTICS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  musicCreate,
  getAllmusic,
  playSong,      
  getAnalytics   
};