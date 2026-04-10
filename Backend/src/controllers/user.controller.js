const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;

    username = username?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const LoginUser = async (req, res) => {
  try {
    let { email, username, password } = req.body;

    email = email?.trim();
    username = username?.trim();
    password = password?.trim();

    if (!password || (!email && !username)) {
      return res.status(400).json({
        message: "Please provide email or username and password",
      });
    }

   
    const user = await userModel.findOne({
      $or: [
        email ? { email } : null,
        username ? { username } : null,
      ].filter(Boolean),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

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

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { LoginUser };




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