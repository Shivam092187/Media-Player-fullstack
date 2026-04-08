// app.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // frontend local dev
  "https://media-player-fullstack-frontendd.onrender.com" // frontend live
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // for Postman, curl
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "The CORS policy for this site does not allow access from the specified origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // cookie support
}));

//  Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend Running");
});

module.exports = app;