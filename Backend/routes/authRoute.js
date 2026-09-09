import express from "express";
import { signup, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        user: req.user
    });
})

export default router;