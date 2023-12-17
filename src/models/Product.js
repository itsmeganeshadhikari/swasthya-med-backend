const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
