import express from 'express';
import { createUser, getUsers ,deleteUser, updatePassword,loginUser } from '../controllers/user.controller.js'
import { authenticateJWT } from '../middleware/jwt.js';

const router = express.Router();

// Routes
router.post('/create', createUser); // register user
router.get('/getusers',   getUsers); // find all users
router.delete('/deleteuser/:id' , deleteUser)  //delete user
router.put('/updateuser' , updatePassword)  // update password
router.get('/loginuser' , loginUser)  // login user
export default router;
