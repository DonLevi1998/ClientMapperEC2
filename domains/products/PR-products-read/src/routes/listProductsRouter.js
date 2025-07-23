import express from 'express';
import { listProductsController } from '../controllers/ListProductsController.js';

const router = express.Router();

router.get('/list', listProductsController); // GET /api/products/list

export default router;
