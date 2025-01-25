import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

////--------- --- ADD PRODUCT --------------

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // VALIDATION

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ Price: "Name is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.maessage);
  }
});

//------------- -- UPDATE PRODUCT ------------------

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // VALIDATION

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ Price: "Name is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.maessage);
  }
});

/// -------------- DELETE PRODUCT -----------------

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// ------------   FETCH 6  PRODUCTS  PAGINATION-----------------

const fetchProduct = asyncHandler(async (req, res) => {
  try {
    const pageSize = 2;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Server Error" });
  }
});

//---------------- FETCH PRODUCT BY ID --------------

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

/// ------ ----- FETCH ALL PRODUCTS --------------------------

const fetchAllProducts = asyncHandler(async (req, res) => {

    try {
     
        const products = await Product.find({}).populate('category').limit(12).sort({createAt: -1})
        res.json(products)
    } catch (error) {
        console.eror(error);
    }
});

// --------------------- ADD PRODUCT REVIEW --------------------

const addProductReview = asyncHandler(async (req, res) => {
    try {

        const {rating , comment} = req.body;3

        const product = await Product.findById(req.params.id)

        if (product) {

            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString)

            if (alreadyReviewed) {
                res.status(400)
                throw new Error("Product already reviewed")
            }

            const review = {
                name : req.user.username, 
                rating : Number(rating),
                comment,
                user: req.user._id
            }

            product.review.push(review)
            product.numReviews = product.reviews.lenght

            product.rating = product.reviews.reduce((acc, item) => item.rating + acc , 0) / product.reviews.lenght


            await product.save()
            res.status(201).json({message : "Rview "})
        }

    } catch (error) {
        console.error(error)
        res.status(400).json(error.maessage);
    }
})

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProduct,
  fetchProductById,
  fetchAllProducts,
  addProductReview
};
