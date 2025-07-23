import { connectDB } from '../config/postgredb.js';

const registerProduct = async (name, description) => {
  try {
    const query = `
      INSERT INTO products (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [name, description];

    const result = await connectDB.query(query, values);

    return result.rows[0]; // Returns the registered product
  } catch (error) {
    console.error('Error registering product:', error);
    throw error;
  }
};

export { registerProduct };
