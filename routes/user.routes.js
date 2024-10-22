import express from 'express';
import { createUser, getUsers, deleteUser, updatePassword, loginUser } from '../controllers/user.controller.js'; // Corrected controller import
import { authenticateJWT } from '../middleware/jwt.js';  // JWT authentication middleware

const router = express.Router();

// Public route for user registration (no authentication required)
router.post('/', createUser); // Register a new user

// Login route (no authentication required)
router.post('/login', loginUser); // Authenticate and log in a user

// Protected routes (requires JWT authentication)

// Route to get all users (authentication required)
router.get('/get', getUsers); // Fetch all users

// Route to delete a user by ID (authentication required)
router.delete('/delete/:id', authenticateJWT, deleteUser); // Delete a user by ID

// Route to update user password (authentication required)
router.put('/update', authenticateJWT, updatePassword); // Update the password of a user

export default router;
