const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

router.get('/', verifyToken, chatController.getChats);
router.post('/', verifyToken, chatController.createChat);
router.post('/message', verifyToken, chatController.sendMessage);
router.get('/:id', verifyToken, chatController.getMessages);

module.exports = router;