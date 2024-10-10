import express from 'express';
import { createProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

// Routes
router.post('/create',  createProduct);
router.get('/getproducts', getProducts);

export default router;
