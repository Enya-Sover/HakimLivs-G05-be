import mongoose
 from "mongoose";
const discountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true },
  expiresAt: { type: Date }
});

export default mongoose.model("DiscountCode", discountCodeSchema);
