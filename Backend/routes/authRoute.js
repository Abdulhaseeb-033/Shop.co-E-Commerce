import express from "express";
import { signup, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);

export default router;