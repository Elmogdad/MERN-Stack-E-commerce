import express  from "express";
const router = express.Router();
import { createCategory } from "../controllers/categoryController.js";  

import { authenticate, authorizeAdmin} from "../middleware/authMiddleware.js";


router.route("/").post(createCategory)


export default router;  