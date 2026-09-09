import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const {
            email,
            phone,
            shippingAddress,
            items,
            subtotal,
            discount,
            deliveryFee,
            totalAmount,
            paymentMethod
        } = req.body;

        const order = await Order.create({
            user: req.user.id,
            email, 
            phone,
            shippingAddress,
            items,
            subtotal,
            discount,
            deliveryFee,
            totalAmount,
            paymentMethod
        });

        res.status(201).json({
            message: "Order created successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create order",
            error: error.message
        });
    }
};