import express from "express";
import { getOrders, getOrderById, getOrdersByUserId, createOrder, deleteOrderById } from "../db/orders";
import { getUserById } from "../db/users";

export const getAllOrders = async (req: express.Request, res: express.Response) => {
    try {
        
        const orders = await getOrders();

        return res.status(200).json(orders);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllOrdersByUserId = async (req: express.Request, res: express.Response) => {
    try {
        
        const {id} = req.params;
        
        const user = await getUserById(id);
        if(!user){
            return res.sendStatus(400);
        }

        const orders = user.role === 'admin' ? await getOrders() : await getOrdersByUserId(id);

        return res.status(200).json(orders);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteOrder = async (req: express.Request, res: express.Response) => {
    try {
        
        const {id} = req.params;

        const deletedOrder = await deleteOrderById(id);

        return res.json(deletedOrder);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateOrder = async (req: express.Request, res: express.Response) => {
    try {
        
        const { id } = req.params;
        const { userId, products, total, paid } = req.body;

        if(!userId || !products) {
            return res.sendStatus(400);
        }

        const order = await getOrderById(id);

        order.userId = userId;
        order.products = products;
        order.total = total;
        order.paid = paid;

        await order.save();

        return res.status(200).json(order).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createNewOrder = async (req: express.Request, res: express.Response) => {
    try {
        
        const { userId, products, total, paid } = req.body;

        if(!userId || !products) {
            return res.sendStatus(400);
        }

        const newOrder = await createOrder({
            userId,
            products,
            total,
            paid
        });

        return res.status(200).json(newOrder).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}