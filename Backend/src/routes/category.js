import express from 'express'
import { createNewCategory, getCategoryById } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.post("/", createNewCategory);

export default categoryRoutes 