const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function testConnection() {
    try {
        const [rows] = await pool.execute('SELECT 1 + 1 AS result');
        console.log('Conexión a DB exitosa:', rows);
    } catch (error) {
        console.error('Error de conexión a DB:', error);
        process.exit(1);
    }
}

testConnection();
exports.findByUsername = async (username) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

exports.findById = async (id) => {
    if (!id) throw new Error('ID is required');
    const [rows] = await pool.execute('SELECT * FROM users WHERE idusers = ?', [id]);
    return rows[0] || null;
};
