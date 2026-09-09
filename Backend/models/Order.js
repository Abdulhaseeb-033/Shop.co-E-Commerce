import mongoose from "mongoose";
import Product from "./Product";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        shippingAddress: {
            firstName: {
                type: String,
                required: true
            },

            lastName: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },
            
            appartment: {
                type: String,
                default:""
            },

            city: {
                type: String,
                required: true
            },

            state: {
                type: String,
                required: true
            },

            postalCode: {
                type: String,
                required: true
            },

            country: {
                type: String,
                required: true
            }
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },

                name: {
                    type: String,
                    required: true
                },

                image: {
                    type: String,
                    default: ""
                },

                price: {
                    type: Number,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                },

                size: {
                    type: String,
                    default: ""
                },

                color: {
                    type: String,
                    default: ""
                }
            }
        ],

        subtotal: {
            type: Number,
            required: true
        },

        discount: {
            type: Number,
            required: true
        },

        deliveryFee: {
            type: Number,
            default: 0
        },

        totalAmount: {
            type: Number,
            required: true
        },
        
        paymentMethod: {
            type: Number,
            enum: ["card", "cod"],
            required: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;