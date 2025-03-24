import Product from "../models/Product.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import mongoose from "mongoose";


// Hämta alla produkter
export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find(); 
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const createProducts = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


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

// TODO: Lägg till update och delete funktioner