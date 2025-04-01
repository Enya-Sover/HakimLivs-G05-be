import express from "express";
import { getAllProducts, deleteProduct, getProductById, createProducts, updateProduct, getProductsByCategoryId ,createMultipleProducts } from "../controllers/productController.js";


const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post("/", createProducts)
productsRouter.delete('/:id', deleteProduct)
productsRouter.put('/:id', updateProduct)
productsRouter.post("/addMultiple", createMultipleProducts)

productsRouter.get("/category/:id", getProductsByCategoryId)

 


export default productsRouter;