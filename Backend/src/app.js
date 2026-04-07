const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

const app = express();

// 🔥 FIXED CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded music files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

app.get('/', (req, res) => res.send('Spotify Clone Backend Running 🚀'));

module.exports = app;