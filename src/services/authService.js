const bcrypt = require('bcrypt');
const pool = require('../config/db');


exports.registerUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *',
        [name, email, hashedPassword]
    );

    return result.rows[0];
};

exports.loginUser = async (email, password) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
        throw new Error('Email atau password salah');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Email atau password salah');
    }

    return user;
};