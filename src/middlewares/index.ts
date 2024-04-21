import express from "express";
import { get, identity, merge } from 'lodash';

import { getUserById, getUserBySessionToken } from "../db/users";

export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
        const sessionToken = req.headers['jontiesrest'] ?? req.cookies['JONTIESREST'];
        
        // console.log(req.cookies);
        // console.log(req.headers['jontiesrest']);

        console.log(sessionToken);
        if(!sessionToken) {
            console.log("invalid sesion token");
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) {
            console.log("no token found");
            return res.sendStatus(403);
        }

        // if the session token is valid
        // attach the user to the request
        merge(req, { identity: existingUser});

        return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        
        console.log(id);
        console.log(currentUserId);
        
        if(!currentUserId) {
            console.log("didnt find current user");
            return res.sendStatus(403);
        }

        const currentUser = await getUserById(currentUserId);

        if(currentUserId.toString() !== id && currentUser.role !== 'admin') {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAdmin = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
        const currentUserRole = get(req, 'identity.role') as string;

        if(!currentUserRole) {
            return res.sendStatus(403);
        }

        console.log("user role: " + currentUserRole);

        if(currentUserRole !== 'admin') {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}