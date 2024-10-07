import express from 'express';
import { createUser, getUsers } from '../controllers/user.controller.js'

const router = express.Router();

// Routes
router.post('/create', createUser);
router.get('/', getUsers);

export default router;
