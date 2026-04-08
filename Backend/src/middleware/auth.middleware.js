const jwt = require("jsonwebtoken");

// 🔐 Common function (DRY principle)
const verifyToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

// ================= USER AUTH =================
const authUser = (req, res, next) => {
  const decoded = verifyToken(req);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = decoded;
  next();
};

// ================= ARTIST AUTH =================
const authArtist = (req, res, next) => {
  const decoded = verifyToken(req);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (decoded.role !== "artist") {
    return res.status(403).json({ message: "Only artists allowed" });
  }

  req.user = decoded;
  next();
};

module.exports = { authUser, authArtist };