import { where } from 'sequelize';
import db from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { passwordSchema } from '../validation/validatePassword.js';



dotenv.config(); // Load environment variables

// Utility function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Create User
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const finduser = await db.User.findOne({ where: { email: email } });
    if (finduser) {
      return res.status(200).json({ message: "email already exists" })
    }
    await passwordSchema.validate({ password });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await db.User.create({ name, email, password: hashedPassword });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({ user, token }); // Send user data and token
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Users
export const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      // Delete the user
      await user.destroy();
      res.status(200).json({ message: "User deleted", user });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User Password Controller
export const updatePassword = async (req, res) => {
  const { email, oldpassword, newpassword } = req.body; // Provided email, old password, and new password

  try {
    // Find the user by email
    const user = await db.User.findOne({ where: { email } });
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the old password with the saved hashed password
    const isMatch = await bcrypt.compare(oldpassword, user.password);

    console.log(isMatch, "=========")
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Ensure the new password is not the same as the old password
    const isSamePassword = await bcrypt.compare(newpassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password cannot be the same as the old password' });
    }

    // Hash the new password and update the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newpassword, salt);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "here" });
  }
};

// Add Login Function to Authenticate User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password)

  try {
    // Find user by email
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate token
    const token = generateToken(user);
    res.status(200).json({ token, message: "login successfull" }); // Send user data and token
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
