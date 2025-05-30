import Product from "../models/Product.js";
import mongoose from "mongoose";

// _______________________________________________________ GET FUNKTIONER ___________________________________

// GET ALL funktion
export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate("category"); 
      res.status(200).json(products);
    } catch (error) {
      console.error(error)
    
      res.status(500).json({ error: error.message });
    }
  };
// GET Specific Product funktion

export const getProductById = async (req, res) => {
  const {id} = req.params
  try {
    const product = await Product.findById(id);
    if (product === null) {
      return res.status(404).json({error: error.message })
    } else {
    res.status(200).json(product); 
  }   
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET produkter baserat på category

export const getProductsByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json( { error: "ID is no real ObjectId" } )
    }
    const products = await Product.find({ category: id }).populate( "category" );

    if (products.length === 0) {
      return res.status(200).json({ message: "There is no products connected to this category" })
    }

    res.status(200).json(products);

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
}


// ______________________________________________________POST FUNKTIONER___________________________________________

// POST funktion
export const createProducts = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({name: req.body.name})

    if(existingProduct) {
      return res.status(400).json({error: "Product already exists"})
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
    
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
};

//POST för att lägga till flera produkter

export const createMultipleProducts = async (req, res) => {
  try {
    const products = req.body
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Try agin no array created"})
    }
    const newProducts = await Product.insertMany(products)
    res.status(201).json({ success: true, data: newProducts})
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, error: err.message})
  }
}
// ____________________________________________________________DELETE FUNKTIONER_______________________________

//DELETE funktion

export const deleteProduct = async(req, res)=>{
  const {id} = req.params
  // Valiterar att id:t är i rätt format innan try/catch
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success: false, message: 'Product not found'})
} 
  try {
      const deletedProduct = await Product.findByIdAndDelete(id)
      if(!deletedProduct){
        return res.status(404).json({error: 'Product not found'})
      }
      res.status(200).json({success: true, message: 'Product deleted successfully'})
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: "Internal server error" })
    }
}

// _____________________________________________________UPDATE Funktioner______________________________________________________

// UPDATE product

export const updateProduct = async (req, res)=>{
    const {id} = req.params
    const product = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({success: false, message: 'Product not found'})
  } 
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true, runValidators: true})
    res.status(200).json({success: true, data: updatedProduct})
  } catch (error) {
    console.error(error)
    res.status(500).json({sucess: false, message: 'Server error'})

  }
}
