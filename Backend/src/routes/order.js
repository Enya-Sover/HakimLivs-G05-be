import express from 'express'
import { getAllOrders, getOrderById, getUserOrders, createNewOrder } from '../controllers/orderController.js'
import { auth, adminAuth } from '../middleware/auth.js'
import { applyDiscount } from '../middleware/applyDiscount.js'
const orderRoutes = express.Router()


orderRoutes.get("/", auth, adminAuth, getAllOrders)
orderRoutes.get("/:id", auth, adminAuth, getOrderById )
orderRoutes.post("/", auth, applyDiscount, createNewOrder) 


export default orderRoutes
