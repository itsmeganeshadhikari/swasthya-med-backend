import express from "express";
import { create, verify } from "../controllers/khalti.controller.js";

const khaltiRoute = express.Router();
khaltiRoute.post("/", create);
khaltiRoute.post("/lookup", verify);

export default khaltiRoute;
