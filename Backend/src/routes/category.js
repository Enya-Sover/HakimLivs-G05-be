import express from 'express'
import { createNewCategory, getCategoryById, getAllCategories, deleteCategory, updateCategory } from '../controllers/categoryController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories); // alla kan se alla kategorier
categoryRoutes.get("/:id",auth, adminAuth, getCategoryById); // bara admin kan se en kategori
categoryRoutes.post("/", auth, adminAuth, createNewCategory); // bara admin kan skapa en ny kategori
categoryRoutes.delete("/:id", auth, adminAuth, deleteCategory) // bara admin kan ta bort en kategori
categoryRoutes.put("/:id", auth, adminAuth, updateCategory) // bara admin kan uppdatera en kategori

export default categoryRoutes 