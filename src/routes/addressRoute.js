import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddressById,
  getAllAddress,
  updateAddress,
} from "../controllers/address.controller.js";

const addressRoute = express.Router();
addressRoute.get("/list", getAllAddress);
addressRoute.get("/:id", getAddressById);
addressRoute.post("/new", createAddress);
addressRoute.put("/:id", updateAddress);
addressRoute.delete("/:id", deleteAddress);

export default addressRoute;
