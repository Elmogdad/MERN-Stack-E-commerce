import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).send({ message: "Category already exists" });
    }

    const category = await Category({ name }).save();
    res.json(category);
  } catch (error) {
    res.status(400);
    throw new Error("Category not created");
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const {categoryId} = req.params;

    const category = await Category.findById({ _id: categoryId });

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


const removeCategory = asyncHandler(async (req, res) => {

  try {

    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" })
  }
}) 

const listCategory = asyncHandler(async (req, res) => {
  try {
     const all = await Category.find({});
     res.json(all)
  } catch (error) {
   console.log(error);
  }
})

const readCategory = asyncHandler(async (req, res) => {

  const category = await Category.findOne({_id : req.body.params.id});
  res.json(category);
})

export { createCategory, updateCategory , removeCategory, listCategory , readCategory};
