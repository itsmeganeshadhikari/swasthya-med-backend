import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please enter product name"],
  },
  subDescription: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  productCode: {
    type: String,
  },
  productSize: {
    type: String,
  },
  sku: {
    type: String,
  },
  category: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  regularPrice: {
    type: Number,
  },
  salePrice: {
    type: Number,
    required: [true, "Please enter sale price"],
  },
  offerPrice: {
    type: Number,
    required: [true, "Please enter offer price"],
  },
  rating: {
    type: Number,
    default: 20,
  },
  stock: {
    type: Boolean,
    required: [true, "Please enter product stock"],
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Duplicate the ID field.
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set("toJSON", {
  virtuals: true,
});

const Product = model("Product", productSchema);

export default Product;
