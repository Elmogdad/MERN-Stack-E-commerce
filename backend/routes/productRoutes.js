import express from "express";
import formidable from "express-formidable";
const router = express.Router()

import { addProduct, updateProductDetails } from "../controllers/productController.js";

import { authenticate , authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js"



router.route('/').post( formidable() , addProduct);
router.route('/:id').put(formidable(), updateProductDetails)

export default router