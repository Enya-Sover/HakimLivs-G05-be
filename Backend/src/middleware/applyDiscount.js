import DiscountCode from "../models/DiscountCode.js";

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

  // Räkna ut rabatt
  const discountAmount = Math.round((total * code.percentage) / 100); // heltal, du kan ta bort Math.round om du vill ha decimaler
  const newTotal = Math.max(0, total - discountAmount); // aldrig under 0

  // Uppdatera req.body
  req.body.total = newTotal;
  req.body.discountAmount = discountAmount;
  req.body.discountCode = code.code;

  next();
};


