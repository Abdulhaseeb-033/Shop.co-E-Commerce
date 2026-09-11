import express from "express";
import { getUsers, getUserById, deleteUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;