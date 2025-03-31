import express from 'express'
import { createNewCategory, getCategoryById, getAllCategories } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.post("/", createNewCategory);

export default categoryRoutes 