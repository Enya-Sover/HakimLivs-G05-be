import express from 'express'
import {getAllUsers} from '../controllers/userController.js'
// import authMiddleware from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers)



export default userRoutes

