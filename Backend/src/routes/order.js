import express from 'express'
import { getAllOrders, getOrderById, getUserOrders, createNewOrder, getRevenuePerMonth } from '../controllers/orderController.js'
import { auth, adminAuth } from '../middleware/auth.js'
const orderRoutes = express.Router()


orderRoutes.get("/", auth, adminAuth, getAllOrders)
orderRoutes.get("/revenue-per-month", getRevenuePerMonth)
orderRoutes.get("/:id", auth, adminAuth, getOrderById )
orderRoutes.post("/", auth, createNewOrder) 


export default orderRoutes
