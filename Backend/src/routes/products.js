import express from "express";
import { getAllProducts, deleteProduct, createProducts, createMultipleProducts, updateProduct } from "../controllers/productController.js";

const productsRouter = express.Router();
productsRouter.get("/", getAllProducts);
productsRouter.post("/", createProducts)
productsRouter.delete('/:id', deleteProduct)
productsRouter.put('/:id', updateProduct)
productsRouter.post("/addMultiple", createMultipleProducts)

// productsRouter.put('/:id', updateProduct)


export default productsRouter;