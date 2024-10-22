
import db from '../db/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils.js';  // Importing the generateToken function
import { passwordSchema } from '../validation/validatePassword.js';



// Create User
export const createUser = async (req, res) => {

  try {

    // Extract data from the request body
    const { name, email, password } = req.body;

    const finduser = await db.User.findOne({ where: { email: email } });
    if (finduser) {
      return res.status(200).json({ message: "email already exists" })
    }

    await passwordSchema.validate({ password });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const user = await db.User.create({ name, email, password: hashedPassword });

    // Generate a token for the newly created user
    const token = generateToken(user);

    res.status(201).json({ user, token }); // Send user data and token
  } catch (error) {
    // Handle any errors that occur
    res.status(400).json({ error: error.message });
  }
};



// Get all Users
export const getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
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
    }

    // Delete the user and send a success message
    await user.destroy();
    res.status(200).json({ message: "User deleted", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Update User Password
export const updatePassword = async (req, res) => {
  const { email, oldpassword, newpassword } = req.body;

  try {
    // Find the user by their email
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the old password matches the stored password
    const isMatch = await bcrypt.compare(oldpassword, user.password);

    console.log(isMatch, "=========")
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Ensure the new password is not the same as the old one
    const isSamePassword = await bcrypt.compare(newpassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password cannot be the same as the old password' });
    }

    // Hash the new password and update the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newpassword, salt);

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "here" });
  }
};





// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token and send it in the response
    const token = generateToken(user);
    res.status(200).json({ token, message: "login successfull" }); // Send user data and token
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


