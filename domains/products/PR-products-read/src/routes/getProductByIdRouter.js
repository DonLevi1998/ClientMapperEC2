import express from 'express';
import { getProductByIdController } from '../controllers/GetProductByIdController.js';

const router = express.Router();

router.get('/:id', getProductByIdController); // GET /api/products/:id

export default router;
