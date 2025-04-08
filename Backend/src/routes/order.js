import express from 'express'
import { getAllOrders, getOrderById, createNewOrder } from '../controllers/orderController.js'

const orderRoutes = express.Router()


orderRoutes.get("/", getAllOrders)
orderRoutes.get("/:id", getOrderById )
orderRoutes.post("/", createNewOrder)

export default orderRoutes
