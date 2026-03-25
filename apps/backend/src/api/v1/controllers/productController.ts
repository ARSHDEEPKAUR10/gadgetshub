import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const categoryParam = req.params.category;

    if (!categoryParam || Array.isArray(categoryParam)) {
      res.status(400).json({ message: "Invalid category" });
      return;
    }

    const products = await productService.getProductsByCategory(categoryParam);
    res.status(200).json(products);
  } catch {
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
};

export const getProductsByCategoryAndBrand = async (
  req: Request,
  res: Response
) => {
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

    const products = await productService.getProductsByCategoryAndBrand(
      categoryParam,
      brandParam
    );

    res.status(200).json(products);
  } catch {
    res
      .status(500)
      .json({ message: "Failed to fetch products by category and brand" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingProduct = await productService.getProductById(id);

    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedProduct = await productService.updateProduct(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingProduct = await productService.getProductById(id);

    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await productService.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};