import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updatedProduct,
} from "../controllers/productController.mjs";
const router = express.Router();
//! GET all products
router.get("/", getProducts);

//! CREATE a new product
router.post("/", createProduct);

//! UPDATE a product (PUT)
router.put("/:id", updatedProduct);

//! DELETE a product
router.delete("/:id", deleteProduct);

export default router;
