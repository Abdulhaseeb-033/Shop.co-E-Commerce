import express from "express";
import "dotenv/config";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("SHOP.CO Backend is running...");
});

export default app;