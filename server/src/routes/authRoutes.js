const express = require('express');
const router = express.Router();
const { check, register, login } = require('../controllers/authController');

// GET /api/auth/check?contactNumber=...
router.get('/check', check);
// POST /api/auth/register
router.post('/register', register);
// POST /api/auth/login
router.post('/login', login);

module.exports = router;
