const express = require('express');
const multer = require('multer');
const { authArtist, authUser } = require('../middleware/auth.middleware');
const musicController = require('../controllers/music.controller');

const router = express.Router();

// ✅ Multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// ================= ROUTES =================

// 🎵 Upload song (artist only)
router.post(
  "/upload",
  authArtist,
  upload.single("music"), // ⚠️ field name must match frontend
  musicController.musicCreate
);

// 🎧 Get all songs (public)
router.get("/", musicController.getAllmusic);

// ▶️ Play song (login required)
router.get(
  "/play/:id",
  authUser,
  musicController.playSong
);

// 📊 Analytics (artist only)
router.get(
  "/analytics",
  authArtist,
  musicController.getAnalytics
);

module.exports = router;