const express = require('express');
const { userRegister, LoginUser, LogoutUser, getMe } = require('../controllers/user.controller');
const { authUser } = require('../middleware/auth.middleware'); // middleware to get user from token

const router = express.Router();

// Auth routes
router.post('/register', userRegister);
router.post('/login', LoginUser);
router.post('/logout', LogoutUser);

// NEW: Get current logged-in user
router.get('/me', authUser, getMe);

module.exports = router;