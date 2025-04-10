import express from 'express'
import { getAllOrders, getOrderById, getUserOrders, createNewOrder } from '../controllers/orderController.js'
import { auth, adminAuth } from '../middleware/auth.js'
const orderRoutes = express.Router()


orderRoutes.get("/", auth, adminAuth, getAllOrders)
orderRoutes.get("/:id", auth, adminAuth, getOrderById )
orderRoutes.post("/", auth, createNewOrder) 


export default orderRoutes
