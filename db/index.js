import { Sequelize } from 'sequelize';
import { database } from '../config.js'; // import database config
import CartModel from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';
import UserModel from '../models/user.model.js';

// Initialize Sequelize instance
const sequelize = new Sequelize(database.name, database.user, database.password, {
  host: database.host,
  dialect: 'mysql',
  port: database.port,
  logging: false,  // Disable logging queries, enable for debugging
});

// Object to hold Sequelize instance and models
const db = {
  sequelize,  // Sequelize instance
  Sequelize,  // Sequelize constructor
};

// Initialize models

// db.User = UserModel(sequelize, Sequelize);
db.Product = ProductModel(sequelize, Sequelize);
db.Cart = CartModel(sequelize, Sequelize);

// Test database connection and sync models individually
async function testAndSyncModels() {
  try {
    await sequelize.authenticate();
    // console.log('Connection to the database has been established successfully.');

    // Sync each model individually
    await db.User.sync({ alter: true });
    console.log('User table synced successfully.');

    // await db.Product.sync({ alter: true });
    // console.log('Product table synced successfully.');


    // await db.Cart.sync({ alter: true });
    // console.log('Cart table synced successfully.');

  } catch (error) {

  }
}

testAndSyncModels();  // Test the connection and sync models

export default db;
