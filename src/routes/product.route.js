import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";

const productRoute = express.Router();
// GET all products
productRoute.get("/", getAllProducts);

// GET a specific product by ID
productRoute.get("/:id", getProductById);

// POST a new product
productRoute.post("/", createProduct);

// PUT/update a product by ID
productRoute.put("/:id", updateProduct);

// DELETE a product by ID
productRoute.delete("/:id", deleteProduct);

export default productRoute;
