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
    shippingAdress: {
        street: {type: String, required: true},
        zipcode: {type: String, require: true},
        city: {type: String, required: true},
        country: {type: String, required:true}
    },
    totalAmount: {
        type: Number,
        required: true
    },
    }, {
        timestamps: true
    })

export default mongoose.model("Order", orderSchema)