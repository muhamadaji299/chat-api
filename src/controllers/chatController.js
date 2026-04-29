const chatService = require('../services/chatService');

exports.createChat = async (req, res) => {
    try {
        const userId = req.user.id;
        const chat = await chatService.createChat(userId);

        res.status(201).json({
            status: 'success',
            data: chat
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { chat_id, message } = req.body;

        if (!chat_id || !message) {
            return res.status(400).json({
                status: 'error',
                message: 'chat_id dan message harus diisi'
            });
        }

        const result = await chatService.sendMessage(chat_id, message);

        res.json({
            status: 'success',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const chatId = req.params.id;
        const messages = await chatService.getMessages(chatId);

        res.json({
            status: 'success',
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};