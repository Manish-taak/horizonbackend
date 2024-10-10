import db from '../db/index.js';

export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await db.Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
