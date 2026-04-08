const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

module.exports = app;