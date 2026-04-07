const jwt = require("jsonwebtoken");

const authArtist = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const authUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authArtist, authUser };