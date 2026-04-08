const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
  origin: FRONTEND_URL,   // sirf frontend allow hoga
  credentials: true       // cookies/token ke liye
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

module.exports = app;