import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name.trim()) {
      return res.status(400).send({ message: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).send({ message: "Category already exists" });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Category not created");
  }
});

export { createCategory };
