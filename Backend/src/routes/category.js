import express from 'express'
import { createNewCategory, getCategoryById, getAllCategories, deleteCategory, updateCategory } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.post("/", createNewCategory);
categoryRoutes.delete("/:id", deleteCategory)
categoryRoutes.put("/:id", updateCategory)

export default categoryRoutes 