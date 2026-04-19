const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

// ✅ CORS (safe + working)
const allowedOrigins = [
  "http://localhost:5173",
  "https://media-player-fullstack-2.onrender.com",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", origin);
    return callback(null, false); // ❗ error throw mat karo
  },
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

// ✅ Health route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ 404 handler (IMPORTANT FIX — no "*")
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;