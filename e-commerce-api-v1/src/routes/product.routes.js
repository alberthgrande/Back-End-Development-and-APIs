import express from "express";

import * as productController from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", productController.getProductsController);
router.post("/", productController.createProductController);
router.get("/:id", productController.getProductsByIdController);

export default router;
