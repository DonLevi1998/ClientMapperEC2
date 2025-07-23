import express from 'express';
import { updateProductController } from '../controllers/UpdateProductController.js';

const router = express.Router();

router.put('/update/:id', updateProductController);

export default router;
