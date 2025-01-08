import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error Fetching all products:", error.message)
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};

export const createProducts = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Creating product:", error.message);
        res.status(500).json({ success: false, message: "Failed to create product"});
    }
};

export const updateProducts = async (req, res) => {
    const id = req.params.id;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        
        console.error("Error in Updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deleteProducts = async (req, res) => {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" })
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in Deleting product:", error.message);
        res.status(500).json({ success: false, message: "PServer Error"});
    }
};