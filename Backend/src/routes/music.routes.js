const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');
const musicController = require('../controllers/music.controller');

const upload = multer({ 
  storage: multer.memoryStorage(), 
  limits: { fileSize: 10 * 1024 * 1024 } 
});

const router = express.Router();

// ✅ Upload song (artist only)
router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.musicCreate
);

// ✅ Get all songs
router.get("/", musicController.getAllmusic);

// 🔥 NEW: Play song (increment plays)
router.get(
  "/play/:id",
  authMiddleware.authUser,
  musicController.playSong
);

// 🔥 NEW: Analytics (artist only)
router.get(
  "/analytics",
  authMiddleware.authArtist,
  musicController.getAnalytics
);

module.exports = router;