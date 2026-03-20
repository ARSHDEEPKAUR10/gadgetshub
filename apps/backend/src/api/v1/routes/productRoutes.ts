import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get(
  "/category/:category/brand/:brand",
  productController.getProductsByCategoryAndBrand
);
router.get("/:id", productController.getProductById);

export default router;