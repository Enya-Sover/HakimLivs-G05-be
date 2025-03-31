import express from 'express'
import { createNewCategory, getAllCategories } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.post("/", createNewCategory);

export default categoryRoutes 