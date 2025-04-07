import express from 'express'
import { getAllOrders, getOrderById } from '../controllers/orderController.js'

const orderRoutes = express.Router()

orderRoutes.get("/", getAllOrders)
orderRoutes.get("/:id", getOrderById )

export default orderRoutes
