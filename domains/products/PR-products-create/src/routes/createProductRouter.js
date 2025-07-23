import express from 'express';
import { createProduct } from '../controllers/CreateProductsController.js';

const router = express.Router();

router.post('/create', createProduct);

export default router;
