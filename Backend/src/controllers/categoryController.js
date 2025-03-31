import Category from "../models/Category.js";



// Hämta alla kategorier

export const getAllCategories = async (req, res) => {
    try {
      const category = await Category.find(); 
      res.status(200).json(category);
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message });
    }
  };

// Skapa ny kategori

export const createNewCategory = async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error(error)
      console.log(error)
      res.status(400).json({ error: error.message });
    }
  };
