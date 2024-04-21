import express from "express";

import { getAllProducts, deleteProduct, updateProduct, createNewProduct } from "../controllers/productsController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get('/products', getAllProducts);
    router.delete('/products/:id', isAuthenticated, deleteProduct);
    router.patch('/products/:id', isAuthenticated, updateProduct);
    router.post('/products', isAuthenticated, createNewProduct);
}