// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Import necessary middleware or controllers
const { getUser, updateUser, deleteUser } = require('../controllers/userController');

// Define endpoints
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;