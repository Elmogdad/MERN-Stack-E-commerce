import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProduct,
  fetchProductById,
  fetchAllProducts,
  addProductReview
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route("/").get(fetchProduct).post(formidable(), addProduct);
router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(addProductReview);
router
  .route("/:id")
  .get(fetchProductById)
  .put(formidable(), updateProductDetails)
  .delete(removeProduct);

export default router;
