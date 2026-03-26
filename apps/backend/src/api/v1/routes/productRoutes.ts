import { Router } from "express";
import * as productController from "../controllers/productController";
import { validateRequest } from "../middleware/validateRequest";
import { productSchema } from "../validations/productSchema";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get(
  "/category/:category/brand/:brand",
  productController.getProductsByCategoryAndBrand
);
router.get("/:id", productController.getProductById);

router.post("/", validateRequest(productSchema), productController.createProduct);
router.put("/:id", validateRequest(productSchema), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
