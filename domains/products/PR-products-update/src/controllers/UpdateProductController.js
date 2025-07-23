import { updateProduct } from '../models/UpdateProductModel.js';

const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      return res.status(400).json({ message: 'Both name and description are required' });
    }

    const updatedProduct = await updateProduct(id, name, description);

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

export { updateProductController };

