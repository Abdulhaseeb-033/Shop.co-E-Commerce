import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            mesage: "Product created successfully.",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create product.",
            error: error.message
        });
    }
};

export const getProducts  = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            message: "Products fetched successfully.",
            products
        });
    } catch (error) {
        res.status(500).json({
            message:"Failed to fetch products",
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product fetched seccessfully",
            product
        });
    } catch (error) {
        res,status(500).json({
            message:"Failed to fetch product",
            error: error.message
        });
    }
};