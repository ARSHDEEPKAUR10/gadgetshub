"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductsByCategoryAndBrand = exports.getProductsByCategory = exports.getProductById = exports.getAllProducts = void 0;
const productService = __importStar(require("../services/productService"));
const getAllProducts = async (_req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await productService.getProductById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch product" });
    }
};
exports.getProductById = getProductById;
const getProductsByCategory = async (req, res) => {
    try {
        const categoryParam = req.params.category;
        if (!categoryParam || Array.isArray(categoryParam)) {
            res.status(400).json({ message: "Invalid category" });
            return;
        }
        const products = await productService.getProductsByCategory(categoryParam);
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Category fetch error:", error);
        res.status(500).json({ message: "Failed to fetch products by category" });
    }
};
exports.getProductsByCategory = getProductsByCategory;
const getProductsByCategoryAndBrand = async (req, res) => {
    try {
        const categoryParam = req.params.category;
        const brandParam = req.params.brand;
        if (!categoryParam || Array.isArray(categoryParam)) {
            res.status(400).json({ message: "Invalid category" });
            return;
        }
        if (!brandParam || Array.isArray(brandParam)) {
            res.status(400).json({ message: "Invalid brand" });
            return;
        }
        const products = await productService.getProductsByCategoryAndBrand(categoryParam, brandParam);
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Category and brand fetch error:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch products by category and brand" });
    }
};
exports.getProductsByCategoryAndBrand = getProductsByCategoryAndBrand;
const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ message: "Failed to create product" });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const existingProduct = await productService.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        const updatedProduct = await productService.updateProduct(id, req.body);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const existingProduct = await productService.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        await productService.deleteProduct(id);
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Failed to delete product" });
    }
};
exports.deleteProduct = deleteProduct;
