import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Hämta alla kategorier
export const getAllCategories = async(req, res)=>{
    try {
      const category = await Category.find()
      res.status(200).json(category)
    } catch (error) {
      console.error(error)
    }

}
export const getCategoryById = async (req, res) => {
  const {id} = req.params
  try {
    const category = await Category.findById(id);
    if (category === null) {
      return res.status(404).json({error: error.message })
    } else {
    res.status(200).json(category); 
  }   
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Skapa ny kategori

export const createNewCategory = async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: error.message });
    }
  };

  export const getProductsByCategoryId = async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Product.find({ category: id });
      res.status(201).json(products);
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: error.message });
    }
  }