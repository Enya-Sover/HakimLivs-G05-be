import Order from "../models/Order.js";
import mongoose from "mongoose";
import User from "../models/User.js";

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

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({user: userId }).populate('items.productId')

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Ingen orderhistorik finns kopplad till denna kund' })
        }
        res.status(200).json(orders);
    } catch { 
        res.status(500).json({ error: 'Serverfel', details: error.message });

    }
}