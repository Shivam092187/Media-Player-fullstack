// server.js
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

// Local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for Vercel serverless
module.exports = app;