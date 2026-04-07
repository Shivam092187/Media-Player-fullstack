const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },  // string hi rehne do
  uri: { type: String, required: true },

  // 🔥 NEW FIELD (Analytics)
  plays: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Music', musicSchema);