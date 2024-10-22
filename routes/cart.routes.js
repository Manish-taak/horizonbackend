import express from 'express';

import { authenticateJWT } from '../middleware/jwt.js';
import handleFileUpload from '../middleware/handleFileUpload.js';
import { addToCart, getUserCart, removeFromCart, updateCartQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

// Add item to cart with single image, multiple images, and files upload

router.post('/', authenticateJWT, handleFileUpload('fields', [
    { name: 'singleImage', maxCount: 1 },        // Single image field
    { name: 'multipleImages', maxCount: 5 },     // Multiple images field
    { name: 'singleFile', maxCount: 1 },         // Single file field
    { name: 'multipleFiles', maxCount: 5 }       // Multiple files field
]),
    addToCart
);

// Remove item from cart
router.delete('/:cartItemId', authenticateJWT, removeFromCart);

// Get user's cart
router.get('/:userId', authenticateJWT, getUserCart);

// Update item quantity
router.put('/cart', authenticateJWT, updateCartQuantity);

export default router;
