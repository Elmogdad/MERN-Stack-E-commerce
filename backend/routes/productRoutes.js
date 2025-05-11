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
  addProductReview,
  fetchTopProducts,
  fetchNewProducts

} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route("/").get(fetchProduct).post(formidable(), addProduct);
router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, addProductReview);
router.get("/top", fetchTopProducts);
router.get('/new', fetchNewProducts)

router
  .route("/:id")
  .get(fetchProductById)
  .put(formidable(), updateProductDetails)
  .delete(removeProduct);

export default router;
