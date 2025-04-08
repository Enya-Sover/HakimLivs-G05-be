import express from 'express'
import { getAllOrders, getOrderById, getUserOrders, createNewOrder } from '../controllers/orderController.js'

const orderRoutes = express.Router()


orderRoutes.get("/", getAllOrders)
orderRoutes.get("/:id", getOrderById )
orderRoutes.get("/orderHistory", getUserOrders) //api/order/orderHistory
orderRoutes.post("/", createNewOrder)


export default orderRoutes
