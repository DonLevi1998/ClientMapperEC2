const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

exports.create = async ({ email, password }) => {
  const [result] = await pool.execute(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)', 
    [email, password, '']
  );
  return { id: result.insertId, email, password };
};
