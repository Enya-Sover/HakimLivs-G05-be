import Order from "../models/Order.js";
import User from "../models/User.js";


export const getRevenuePerMonth = async (req, res) => {
    try {
        const today = new Date()
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        oneYearAgo.setMonth(today.getMonth());
        const orders = await Order.find({
            createdAt: { $gte: oneYearAgo, $lte: today }
        });
        const revenuePerMonth = {};
        orders.forEach(order => {
            const date = new Date(order.createdAt);
            const month = date.toLocaleString('sv-SE', { month: 'long' });
            const year = date.getFullYear();
            const key = `Revenue for: ${month}-${year}`;
            if (!revenuePerMonth[key]) {
                revenuePerMonth[key] = 0;
            }
            revenuePerMonth[key] += order.totalAmount;

        })
        res.status(200).json(revenuePerMonth)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Något gick fel" });
    }
}

export const topCostumers = async (req, res) => {
    try {
        const today = new Date()
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        oneYearAgo.setMonth(today.getMonth());
        const topCostumers = await User.find().sort({ totalAmount: -1 }).limit(10).select('username email totalAmount');

        res.status(200).json(topCostumers)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Något gick fel" });
    }
}