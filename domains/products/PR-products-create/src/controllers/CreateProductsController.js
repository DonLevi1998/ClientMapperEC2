import { registerProduct } from '../models/ProductsModel.js';

const createProduct = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      return res.status(400).json({ message: 'Both name and description are required' });
    }

    const newProduct = await registerProduct(name, description);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product', err);
    res.status(500).json({ message: 'Error creating product' });
  }
};

export { createProduct };
