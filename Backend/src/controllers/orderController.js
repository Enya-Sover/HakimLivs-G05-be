import Order from "../models/Order.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Product from "../models/Product.js";

//Skapa en order

export const createNewOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;

        await Promise.all(items.map(async (item) => {
            const product = await Product.findById(item.productId).populate('user', 'username email lojaltyBonus');
            if (!product) {
                return res.status(404).json({message: 'No product available'});
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `${product.name} is not in stock` });
            }
            product.stock -= item.quantity;

            await product.save();
        }))
        const totalAmount = items.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        const userId = decoded.id;
        
        
        if (!userId) {
            return res.status(404).json({ message: "User not found" })
        }
        
        const newOrder = new Order({
            user: userId,
            items,
            shippingAddress,
            totalAmount
        })
        
        const user = await User.findById(userId)
        user.totalAmount += totalAmount
        user.orders.push(newOrder._id)
        await user.save()
        console.log(user)

        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error })
    }
}

//Hämta alla orders

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

//Hämta via id
export const getOrderById = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findById(id)
        if (order === null) {
            return res.status(404).json({ error: error.message })
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
        const orders = await Order.find({ user: userId }).populate('items.productId')

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Ingen orderhistorik finns kopplad till denna kund' })
        }
        res.status(200).json(orders);
    } catch {
        res.status(500).json({ error: 'Serverfel', details: error.message });

    }
}