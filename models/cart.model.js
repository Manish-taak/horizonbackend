import { DataTypes } from 'sequelize';

const CartModel = (sequelize) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  // Assuming your user model is named 'Users'
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',  // Assuming your product model is named 'Products'
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // Single image field
    singleImage: {
      type: DataTypes.STRING,  // Store the image path or URL as a string
      allowNull: true,
    },
    // Multiple images field (use JSON type for an array of images)
    multipleImages: {
      type: DataTypes.JSON,  // Store array of image paths (if using a DB like PostgreSQL)
      allowNull: true,
    },
    // Single file field
    singleFile: {
      type: DataTypes.STRING,  // Store the file path or URL as a string
      allowNull: true,
    },
    // Multiple files field (use JSON type for an array of files)
    multipleFiles: {
      type: DataTypes.JSON,  // Store array of file paths (if using PostgreSQL)
      allowNull: true,
    },
  }, {
    tableName: 'carts',  // Custom table name if necessary
    timestamps: true,  // Adds `createdAt` and `updatedAt` timestamps
  });

  return Cart;
};

export default CartModel;
