import DiscountCode from "../models/DiscountCode.js";

export const createNewDiscount = async (req, res, next) => {
    try {
        const { percentage, expiresAt } = req.body;
        const code = req.body.code.trim().toUpperCase();


        const existingCode = await DiscountCode.findOne({ code })
        if (existingCode) {
            return res.status(400).json({ message: 'Discount code already exists' })
        }
        if (percentage < 1 || percentage > 100) {
            return res.status(400).json({ message: "Percentage must be between 1 and 100" });
        }        
        const discount = new DiscountCode({
            code,
            percentage,
            expiresAt
        })
        await discount.save()
        res.status(201).json(discount)

    } catch (error) {
        console.error(error)
        res.status(400).json({ error: error.message })
    }
}