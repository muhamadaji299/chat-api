const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// public
router.post('/register', authController.register);
router.post('/login', authController.login);

// protected (user login)
router.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Ini profile',
        user: req.user
    });
});



module.exports = router;