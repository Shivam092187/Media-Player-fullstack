const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 🔥 kya data aa raha hai check

    const { username, email, password, role = "user" } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }]
    });
    if (isUserAlreadyExist)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hashedPassword, role });

    console.log("USER CREATED:", user); // 🔥 successful creation

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error); // 🔥 exact error
    res.status(500).json({ message: "Internal server error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    // ✅ Frontend se loginInput ya email
    const loginInput = req.body.loginInput || req.body.email;
    const password = req.body.password;

    if (!loginInput || !password)
      return res.status(400).json({ message: "Missing fields" });

    // ✅ Normalize input
    const cleanedInput = loginInput.trim().toLowerCase();

    // ✅ Find user by username or email (case-insensitive)
    const user = await userModel.findOne({
      $or: [
        { username: cleanedInput },
        { email: cleanedInput }
      ]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid password" });

    // ✅ Sign JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Set cookie (cross-domain safe)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    // ✅ Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function LogoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

const getMe = (req, res) => {
  try {
    // authUser middleware req.user me user info set karega
    res.status(200).json({ user: req.user });
  } catch (err) {
    console.error("GET /me ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { userRegister, LoginUser, LogoutUser, getMe};