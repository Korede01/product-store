import express from "express"
import { createProducts, deleteProducts, getProducts, updateProducts } from "../controllers/product.controller.js";

const router = express.Router();

// Get Products
router.get("/", getProducts)
// Create Products
router.post("/", createProducts);
// Update Products
router.put("/:id", updateProducts);
// Delete Products
router.delete("/:id", deleteProducts);

export default router;

