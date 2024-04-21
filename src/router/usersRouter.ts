import express from "express";

import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/usersController";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/users/:id', isAuthenticated, isOwner, getUser);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
}