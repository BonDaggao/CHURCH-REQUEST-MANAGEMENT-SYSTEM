// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import necessary middleware or controllers
const { registerUser, loginUser } = require('../controllers/authController');

// Define endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
