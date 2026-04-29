const pool = require('../config/db');

exports.getAllUsers = async () => {
    const result = await pool.query('SELECT id, name, email FROM users');
    return result.rows;
};