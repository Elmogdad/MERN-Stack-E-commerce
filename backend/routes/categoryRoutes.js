import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(createCategory);
router.route("/:categoryId").put( updateCategory);
router
  .route("/:categoryId")
  .delete(removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
