const express = require('express');
const ProductRouter = express.Router();
const productController = require('../controllers/product.controller');

// GET all products
ProductRouter.get('/', productController.getAllProducts);

// GET a specific product by ID
ProductRouter.get('/:id', productController.getProductById);

// POST a new product
ProductRouter.post('/', productController.createProduct);

// PUT/update a product by ID
ProductRouter.put('/:id', productController.updateProduct);

// DELETE a product by ID
ProductRouter.delete('/:id', productController.deleteProduct);

module.exports = ProductRouter;

