// Import the necessary modules and models
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Address from "../models/address.model.js";
import User from "../models/user.model.js";
// Get all products
export const getAllAddress = catchAsyncErrors(async (req, res) => {
  try {
    const address = await Address.find();
    res.json({ address: address });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single product by ID
export const getAddressById = catchAsyncErrors(async (req, res) => {
  try {
    const address = await Address.find({ user: req.params.id });
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    console.log(address);
    res.json({ address: address });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new product
export const createAddress = catchAsyncErrors(async (req, res) => {
  try {
    const address = new Address(req.body.data);
    await address.save();
    res
      .status(201)
      .json({ success: "Address created successfully", address: [address] });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a product by ID
export const updateAddress = catchAsyncErrors(async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      req.body.data,
      {
        new: true,
      }
    );
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ address: [address] });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a product by ID
export const deleteAddress = catchAsyncErrors(async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
