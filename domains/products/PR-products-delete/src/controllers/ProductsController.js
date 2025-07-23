import { deleteProduct } from '../models/ProductsModel.js';

const deleteProductController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', id: deletedProduct.id });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

export { deleteProductController };
