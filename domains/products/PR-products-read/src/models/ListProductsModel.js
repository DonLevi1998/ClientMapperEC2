import { connectDB } from '../config/postgredb.js';

const getAllProducts = async () => {
  try {
    const query = `SELECT * FROM products ORDER BY id ASC`;
    const result = await connectDB.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw error;
  }
};

export { getAllProducts };
