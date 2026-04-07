const express = require('express');
const { userRegister, LoginUser, LogoutUser } = require('../controllers/user.controller');

const router = express.Router();

// Auth routes
router.post('/register', userRegister);
router.post('/login', LoginUser);
router.post('/logout', LogoutUser);

module.exports = router;