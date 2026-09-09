import express from "express";
import { getUsers, getUserById, deleteUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUserById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;