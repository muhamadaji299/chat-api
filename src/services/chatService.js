const pool = require('../config/db');

exports.createChat = async (userId) => {
    const result = await pool.query(
        'INSERT INTO chats(user_id) VALUES($1) RETURNING *',
        [userId]
    );

    return result.rows[0];
};

exports.sendMessage = async (chatId, message) => {
    // 1. Simpan pesan user
    await pool.query(
        'INSERT INTO messages(chat_id, role, content) VALUES($1,$2,$3)',
        [chatId, 'user', message]
    );

    // 2. Simulasi jawaban AI (DUMMY)
    // Nanti bagian ini diganti dengan pemanggilan API Llama/Chatbot
    const aiReply = `Halo! Ini adalah jawaban otomatis (dummy). Anda tadi mengirim: "${message}"`;

    // 3. Simpan jawaban AI
    const resultAi = await pool.query(
        'INSERT INTO messages(chat_id, role, content) VALUES($1,$2,$3) RETURNING *',
        [chatId, 'ai', aiReply]
    );

    return {
        user_message: message,
        ai_response: aiReply,
        data: resultAi.rows[0]
    };
};

exports.getMessages = async (chatId) => {
    const result = await pool.query(
        'SELECT * FROM messages WHERE chat_id=$1 ORDER BY created_at ASC',
        [chatId]
    );

    return result.rows;
};
