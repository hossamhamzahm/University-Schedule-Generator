import express from "express";
import Sequelize from "sequelize";
import ExpressError from "./ExpressError";
import User from "../model/user";



export default function <T>(
	fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<T>
): (...args: any[]) => Promise<T | void> {
	return async (req, res, next) => {
		try {
			return await fn(req, res, next);
		} catch (e: unknown) {
            // checking if this is a sequelize error
            if (e instanceof Sequelize.BaseError) {
                // e.message += e.parent.sqlMessae
                if (e instanceof Sequelize.ConnectionError){
                    next(new ExpressError(e.message, 500));
                }
                if (e instanceof Sequelize.ValidationError){
                    for(let error of e.errors){
                        e.message += ", " + error.message
                        
                        if (e.name === "SequelizeUniqueConstraintError"){
                            if (error.instance instanceof User) 
                                e.message += ", This username is already taken."
                        }
                    }
                    next(new ExpressError(e.message, 400));
                }
                else next(new ExpressError(e.message, 500));
            }
            else if (e instanceof ExpressError){
                next(e);
            }
            else if (e instanceof Error){
                next(new ExpressError(e.message, 400));
            }
            else{
                next(e);
            }

        }
	};
}