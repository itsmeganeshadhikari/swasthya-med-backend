// Import the necessary modules and models
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import limit from 'p-limit'
// Get all products
export const getAllProducts = catchAsyncErrors(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single product by ID
export const getProductById = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new product
export const createProduct = catchAsyncErrors(async (req, res) => {
  const {
    productName,
    description,
    subDescription,
    productImage,
    productCode,
    productSize,
    sku,
    category,
    quantity,
    regularPrice,
    salePrice,
    offerPrice,
  } = req.body;

  const limits = limit(10)
  try {
    const images = []
    await Promise.all(productImage.map((image) => {
      return limits(async () => {
        const myCloud = await cloudinary.uploader.upload(image, {
          folder: "products",
          width: 100,
          height: 80,
          crop: "scale",
        })
        images.push({ public_id: myCloud?.public_id, url: myCloud?.url })
      })
    }))
    const product = new Product({
      productName,
      description,
      subDescription,
      productCode,
      productSize,
      sku,
      category,
      quantity,
      regularPrice,
      salePrice,
      offerPrice,
      image: images,
    });
    await product.save();
    res.status(201).json({ success: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a product by ID
export const updateProduct = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a product by ID
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
