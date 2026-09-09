import express from "express";

import { createOrder, getOrders, getOrderById, updateOrderStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, adminMiddleware, getOrders);
router.get("/:id", authMiddleware, adminMiddleware, getOrderById);
router.patch("/:id", authMiddleware, adminMiddleware, updateOrderStatus);
export default router;