import express from "express";
import authRouter from "./authRouter";
import usersRouter from "./usersRouter";
import productsRouter from "./productsRouter";
import ordersRouter from "./ordersRouter";

const router = express.Router();

export default (): express.Router => {
    authRouter(router);
    usersRouter(router);
    productsRouter(router);
    ordersRouter(router);
    return router;
}