import express from "express";
import { create } from "../controllers/khalti.controller.js";

const khaltiRoute = express.Router();
khaltiRoute.post("/", create);

export default khaltiRoute;
