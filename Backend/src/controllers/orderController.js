import Order from "../models/Order.js";
import mongoose from "mongoose";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    } 
}

export const getOrderById = async (req, res) => {
    const {id} = req.params
    try {
        const order = await Order.findById(id)
        if (order === null) {
            return res.status(404).json({error: error.message})
        } else {
            res.status(200).json(order)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}