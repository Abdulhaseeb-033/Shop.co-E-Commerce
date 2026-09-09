import express from "express";
import "dotenv/config";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("SHOP.CO Backend is running...");
});

export default app;