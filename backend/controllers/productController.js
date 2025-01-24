import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js"



////--------- --- ADD PRODUCT --------------

const addProduct = asyncHandler(async (req, res) => {

    try {
        const {name, description, price, category, quantity, brand} = req.fields;

        // VALIDATION 

        switch (true) {
            case !name : 
           return res.json({error : "Name is required"})
            case !brand : 
           return res.json({error : "Brand is required"})
            case !description : 
           return res.json({error : "Description is required"})
            case !price : 
           return res.json({Price : "Name is required"})
            case !category : 
           return res.json({error : "Category is required"})
            case !quantity : 
           return res.json({error : "Quantity is required"})
        }


        const product = new Product({...req.fields})
        await product.save();
        res.json(product)

    } catch (error) {
        console.log(error);
        res.status(400).json(error.maessage)
    }
})


//------------- -- UPDATE PRODUCT ------------------

const updateProductDetails = asyncHandler(async (req, res) => {

try { 

    const {name, description, price, category, quantity, brand} = req.fields;

    // VALIDATION 

    switch (true) {
        case !name : 
       return res.json({error : "Name is required"})
        case !brand : 
       return res.json({error : "Brand is required"})
        case !description : 
       return res.json({error : "Description is required"})
        case !price : 
       return res.json({Price : "Name is required"})
        case !category : 
       return res.json({error : "Category is required"})
        case !quantity : 
       return res.json({error : "Quantity is required"})
    }

    const product = await Product.findByIdAndUpdate(req.params.id , {...req.fields} , {new : true});

   await product.save();

    res.json(product)

 } catch (error) {
     console.log(error)
     res.status(400).json(error.maessage)
}
})



export {addProduct , updateProductDetails}