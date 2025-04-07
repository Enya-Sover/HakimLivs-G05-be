import express from 'express'
import {getAllUsers} from '../controllers/userController.js'
import { getUserOrders } from '../controllers/orderController.js';

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers)
userRoutes.get("/orders", getUserOrders) //api/user/orders

export default userRoutes

