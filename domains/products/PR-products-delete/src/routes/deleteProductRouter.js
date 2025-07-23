import express from 'express';
import { deleteProductController } from '../controllers/ProductsController.js';

const router = express.Router();

router.delete('/delete/:id', deleteProductController);

export default router;
