import { getAllProducts } from '../models/ListProductsModel.js';

const listProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error listing products:', error);
    res.status(500).json({ message: 'Error listing products' });
  }
};

export { listProductsController };
