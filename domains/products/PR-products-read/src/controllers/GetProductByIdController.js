import { getProductById } from '../models/GetProductByIdModel.js';

const getProductByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ message: 'Error getting product by ID' });
  }
};

export { getProductByIdController };
