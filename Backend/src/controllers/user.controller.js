const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 

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
    console.error("REGISTER ERROR:", error); // 
    res.status(500).json({ message: "Internal server error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    let { email, username, password } = req.body;

    // ✅ Trim all inputs
    email = email?.trim();
    username = username?.trim();
    password = password?.trim();

    if (!password || (!email && !username)) {
      return res.status(400).json({
        message: "Please provide email or username and password",
      });
    }

    // ✅ SINGLE QUERY (BEST FIX)
    const user = await userModel.findOne({
      $or: [
        { email: email || null },
        { username: username || null }
      ]
    });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Password compare
    const validPassword = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
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