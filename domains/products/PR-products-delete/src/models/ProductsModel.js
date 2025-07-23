import { connectDB } from '../config/postgredb.js';

const deleteProduct = async (id) => {
  try {
    const query = `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
    `;
    const result = await connectDB.query(query, [id]);
    return result.rows[0]; // null si no existe
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export { deleteProduct };
