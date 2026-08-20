import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("SHOP.CO Backend is running...");
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});