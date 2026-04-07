const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function userRegister(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;

        const isUserAlreadyExist = await userModel.findOne({
            $or: [{ username }, { email }]
        });
        if (isUserAlreadyExist)
            return res.status(409).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hashedPassword, role });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({
            message: "User registered successfully",
            token, // ✅ token in response
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function LoginUser(req, res) {
    try {
        const { loginInput, password } = req.body;

        const user = await userModel.findOne({
            $or: [{ username: loginInput }, { email: loginInput }]
        });
        if (!user) return res.status(404).json({ message: "User not found" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
            message: "Login successful",
            token, // ✅ send token
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function LogoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

module.exports = { userRegister, LoginUser, LogoutUser };