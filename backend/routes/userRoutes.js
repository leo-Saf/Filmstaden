const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Registrera användare
router.post('/register', registerUser); // Använd registerUser direkt

// Logga in användare
router.post('/login', loginUser); // Använd loginUser direkt




module.exports = router;
