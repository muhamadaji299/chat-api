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

    // 2. Update title chat jika ini pesan pertama (jika title masih 'New Chat' atau null)
    await pool.query(
        "UPDATE chats SET title = $1, updated_at = NOW() WHERE id = $2 AND (title = 'New Chat' OR title IS NULL)",
        [message.length > 50 ? message.substring(0, 50) + '...' : message, chatId]
    );

    // 3. Panggil API Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: message }],
            model: 'llama-3.1-8b-instant'
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || 'Gagal memanggil API Groq');
    }

    const aiReply = data.choices[0].message.content;

    // 4. Simpan jawaban AI
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

exports.getChats = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM chats WHERE user_id=$1 ORDER BY updated_at DESC',
        [userId]
    );

    return result.rows;
};
