import DiscountCode from "../models/DiscountCode.js";
// applyDiscount.js
export const applyDiscount = async (req, res, next) => {
  const { discountCode, total } = req.body;

  if (!discountCode) {
    return next(); 
  }

  const code = await DiscountCode.findOne({ code: discountCode });

  if (!code) {
    return res.status(400).json({ error: "Ogiltig rabattkod" });
  }

  if (code.expiresAt && new Date() > code.expiresAt) {
    return res.status(400).json({ error: "Rabattkoden har gått ut" });
  }

  const newTotal = total - (total * code.percentage / 100);
  req.body.total = Math.max(0, newTotal); 

  next();
}

