import { connectDB } from '../config/postgredb.js';

const updateProduct = async (id, name, description) => {
  try {
    const query = `
      UPDATE products
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [name, description, id];
    const result = await connectDB.query(query, values);
    return result.rows[0]; // null if don't exist
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export { updateProduct };
