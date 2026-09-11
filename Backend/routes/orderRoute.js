import express from "express";

import { createOrder, getOrders, getOrderById, updateOrderStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrderStatus);
export default router;