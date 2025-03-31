import express from 'express'
import { createNewCategory, getCategoryById, getAllCategories } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.post("/", createNewCategory);
categoryRoutes.post("/", getAllCategories);

export default categoryRoutes 