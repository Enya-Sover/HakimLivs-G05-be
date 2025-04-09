import express from "express";
import { getAllProducts, deleteProduct, getProductById, createProducts, updateProduct, getProductsByCategoryId ,createMultipleProducts } from "../controllers/productController.js";
import { auth, adminAuth } from "../middleware/auth.js";


const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post("/", auth, adminAuth, createProducts)
productsRouter.delete('/:id', auth, adminAuth, deleteProduct)
productsRouter.put('/:id', auth, adminAuth, updateProduct)
productsRouter.post("/addMultiple", createMultipleProducts)

productsRouter.get("/category/:id", getProductsByCategoryId)

 


export default productsRouter;