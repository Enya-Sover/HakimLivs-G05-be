import mongoose from "mongoose";

const orderSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        street: {type: String, required: true},
        zipcode: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required:true}
    },
    totalAmountBeforeDiscount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    discountCode: {
        type: String,
        required: false
    },
    discountAmount: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

export default mongoose.model("Order", orderSchema);
