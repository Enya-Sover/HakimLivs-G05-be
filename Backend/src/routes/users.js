import express from 'express'
import {getAllUsers, getUserById, updatePassword, updateUser} from '../controllers/userController.js'
import { getUserOrders } from '../controllers/orderController.js';
import { auth, adminAuth } from '../middleware/auth.js';
const userRoutes = express.Router();

userRoutes.get("/", getAllUsers)
userRoutes.get("/:id", getUserById)
userRoutes.get("/orders", getUserOrders) 
userRoutes.put("/:id/password", updatePassword)
userRoutes.put("/:id/updateUser", updateUser)

export default userRoutes

