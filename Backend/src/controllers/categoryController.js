import Category from "../models/Category.js";
import mongoose from "mongoose";


export const createNewCategory= async (req, res) => {
  console.log('hej från category')
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: error.message });
    }
  };
