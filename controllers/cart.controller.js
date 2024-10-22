import db from "../db/index.js";

const Cart = db.Cart;

// Add item to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Extract file paths from req.files
  const singleImage = req.files?.singleImage ? req.files.singleImage[0].path : null;
  const multipleImages = req.files?.multipleImages ? req.files.multipleImages.map(file => file.path) : [];
  const singleFile = req.files?.singleFile ? req.files.singleFile[0].path : null;
  const multipleFiles = req.files?.multipleFiles ? req.files.multipleFiles.map(file => file.path) : [];

  try {
    // Check if the item already exists in the cart
    const existingCartItem = await Cart.findOne({ where: { userId, productId } });

    if (existingCartItem) {
      // If item exists, update the quantity 
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Quantity updated', cart: existingCartItem });
    }

    // If item does not exist, create a new cart item with images and files
    const newCartItem = await Cart.create({
      userId,
      productId,
      quantity,
      singleImage,
      multipleImages, // Stored as JSON in your database
      singleFile,
      multipleFiles // Stored as JSON in your database
    });

    return res.status(201).json({ message: 'Item added to cart', cart: newCartItem });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add item to cart', error });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    await cartItem.destroy();
    return res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to remove item from cart', error });
  }
};

// Get cart for a user
export const getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await Cart.findAll({ where: { userId } });
    return res.status(200).json({ cart: cartItems });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch cart', error });
  }
};

// Update cart item quantity
export const updateCartQuantity = async (req, res) => {
  const { cartItemId, quantity } = req.body;

  try {
    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    return res.status(200).json({ message: 'Quantity updated', cart: cartItem });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update quantity', error });
  }
};
