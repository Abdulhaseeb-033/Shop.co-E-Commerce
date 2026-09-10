import Product from "../models/Product.js";
import uploadToCloudinary from "../config/uploadToCloudinary.js";

export const createProduct = async (req, res) => {
    try {
        const imageUrls = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files){
                const result = await uploadToCloudinary(file.buffer);
                imageUrls.push(result.secure_url);
            }
        }
        const product = await Product.create({ 
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            price: req.body.Number(req.body.price),
            discount: req.body.Number(req.body.discount),
            category: req.body.category,
            dressStylr: req.body.dressStyle,
            stock: req.body.Number(req.body.stock),
            isNewArrival: req.body.isNewArrival === "true",
            isTopSelling: req.body.isTopSelling === "true",
            colors: req.body.colors ? JSON.parse(req.body.colors):[],
            sizes: req.body.sizes ? JSON.parse(req.body.sizes):[],
            details: req.body.details ? JSON.parse(req.body.details):[],
            images: imageUrls
         });

        res.status(201).json({
            message: "Product created successfully.",
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
            message: "Product fetched successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message:"Failed to fetch product",
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product =await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update product",
            error: error.message
        });
    }
};

export const deleteProduct =async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
};