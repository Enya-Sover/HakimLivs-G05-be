import express from "express";
import { adminAuth } from "../middleware/auth.js";
import { getAllProducts, deleteProduct, getProductById, createProducts, updateProduct, createMultipleProducts } from "../controllers/productController.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post("/", createProducts)
productsRouter.delete('/:id', deleteProduct)
productsRouter.put('/:id', updateProduct)
productsRouter.post("/addMultiple", createMultipleProducts)

// productsRouter.put('/:id', updateProduct)


export default productsRouter;