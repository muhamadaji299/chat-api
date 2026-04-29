const { Pool } = require('pg');
const dns = require('dns');
require('dotenv').config();

// 🔥 paksa IPv4
dns.setDefaultResultOrder('ipv4first');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.log("❌ Gagal koneksi DB:", err);
    } else {
        console.log("✅ DB Terhubung:", res.rows[0].now);
    }
});

module.exports = pool;