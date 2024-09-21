import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => { //to check if user is authenticated or not
    if(req.session.userId){
        next();
    }
    else {
        next(createHttpError(401, "Unauthorized"));
    }
}