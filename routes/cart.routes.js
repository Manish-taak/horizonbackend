// routes/cart.routes.js

import express from 'express';
import { addToCart, removeFromCart, getUserCart, updateCartQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

// Add item to cart
router.post('/', addToCart);

// Remove item from cart
router.delete('/:cartItemId', removeFromCart);

// Get user's cart
router.get('/:userId', getUserCart);

// Update item quantity
router.put('/cart', updateCartQuantity);

export default router;
