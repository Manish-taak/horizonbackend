import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Utility function to generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },  // Payload: include user ID and email
    process.env.JWT_SECRET,              // Secret key from environment variables
    { expiresIn: '1d' }                  // Token expiration time (1 day)
  );
};
