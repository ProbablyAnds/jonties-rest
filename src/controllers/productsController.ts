import express from "express";
import { getProducts, getProductById, deleteProductById, createProduct } from "../db/products";

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {

        const products = await getProducts();
        
        return res.status(200).json(products);

    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {

        const {id} = req.params;

        const deletedProduct = await deleteProductById(id);

        return res.json(deletedProduct);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        
        const { id } = req.params;
        const { name, description, price } = req.body;

        if(!name || !description || price < 0) {
            return res.sendStatus(400);
        }

        const product = await getProductById(id);

        product.name = name;
        product.description = description;
        product.price = price;

        await product.save();

        return res.status(200).json(product).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createNewProduct = async (req: express.Request, res: express.Response) => {
    try {
        
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.sendStatus(400);
        }

        const product = await createProduct({
            name,
            description,
            price
        });

        return res.status(200).json(product).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}