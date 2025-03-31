import express from "express";
import { getAllProducts, deleteProduct, getProductById, createProducts, updateProduct, getCategoryByProductId ,createMultipleProducts } from "../controllers/productController.js";
import { getAllCategories } from "../controllers/categoryController.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post("/", createProducts)
productsRouter.delete('/:id', deleteProduct)
productsRouter.put('/:id', updateProduct)
productsRouter.post("/addMultiple", createMultipleProducts)

productsRouter.get("/categories", getAllCategories)
productsRouter.get("/:id/category", getCategoryByProductId) // hämtar produkt per id, returnerar kategorin som är kopplad till produkt


// productsRouter.put('/:id', updateProduct)


export default productsRouter;