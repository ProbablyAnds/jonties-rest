import express from "express";

import { getAllOrders, deleteOrder, updateOrder, createNewOrder, getAllOrdersByUserId } from "../controllers/ordersController";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    router.get('/orders', isAuthenticated, getAllOrders);
    router.get('/orders/:id', isAuthenticated, isOwner, getAllOrdersByUserId);
    router.delete('/orders/:id', isAuthenticated, deleteOrder);
    router.patch('/orders/:id', isAuthenticated, updateOrder);
    router.post('/orders', isAuthenticated, createNewOrder);
}