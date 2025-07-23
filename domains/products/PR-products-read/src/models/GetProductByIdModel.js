import { connectDB } from '../config/postgredb.js';

const getProductById = async (id) => {
  try {
    const query = `SELECT * FROM products WHERE id = $1`;
    const result = await connectDB.query(query, [id]);
    return result.rows[0]; // null if don´t exist
  } catch (error) {
    console.error('Error getting product by ID:', error);
    throw error;
  }
};

export { getProductById };
