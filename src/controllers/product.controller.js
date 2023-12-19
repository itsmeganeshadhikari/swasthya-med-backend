// Import the necessary modules and models
const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
    try {
        
        const products = await Product.find(req.query);
        if (!products) {
            return res.status(404).json({ error: "No products found" });
        }
        res.status(200).json({
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({
            product,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Export the controller functions
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
