import { NextFunction, Response } from "express";
import Config from "../config";
import jwt from "jsonwebtoken";
import ExpressError from "../helper/ExpressError";
import Request from "../@types/express"
import LoggedJwt from "../model/logged_jwt"





const sign = async(student_username: string) => {
	const access_token_secret = Config.access_token_secret;
	const signed = await jwt.sign(
		{ student_username, iat: Math.floor(Date.now() / 1000) },
		access_token_secret,
		{ expiresIn: 60 * 60 * 24 }
	);
	// { expiresIn: 60 * 60 });

	await LoggedJwt.create({
		user_username: student_username,
		token: signed,
		expiry_date: 60 * 60 * 24
	})

	return signed;
}


const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.headers.authorization || req.headers.authorization.split(' ').length !== 2) throw new ExpressError("Unauthorized, Please Login", 403);

	const token = req.headers.authorization.split(' ')[1];

	let jwt_payload: { student_username: string; iat: number; exp: number };
	try {
		jwt_payload = (await jwt.verify(token, Config.access_token_secret)) as unknown as { student_username: string; iat: number; exp: number; };
	}
	catch (e: unknown) {
		if(e instanceof Error)
			throw new ExpressError(e.message + ', Please login', 403);
		else throw new ExpressError('Please login', 403);
	}

	const jwt_log = await LoggedJwt.findOne({ where: { token }});
	if(!jwt_log) throw new ExpressError('Please login', 403);

	req.student_username = jwt_payload.student_username;

	return next();
}



export {
    sign,
	isAuthenticated
}