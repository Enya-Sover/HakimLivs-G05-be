import express from 'express'
import { createNewCategory } from '../controllers/CategoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.post("/", createNewCategory);

export default categoryRoutes