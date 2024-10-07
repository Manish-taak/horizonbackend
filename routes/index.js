import express from 'express';
import userRoutes from "../routes/user.routes.js"
import productRoutes from "../routes/product.routes.js"
import cartRoutes from "../routes/cart.routes.js"

const router = express.Router();

// Use specific routes
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);

export default router;
