import express from 'express'
import { createNewCategory, getCategoryById, getAllCategories, deleteCategory } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.post("/", createNewCategory);
categoryRoutes.delete("/:id", deleteCategory)

export default categoryRoutes 