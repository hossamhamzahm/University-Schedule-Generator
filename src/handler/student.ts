import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import { Student, StudentStore } from "../model/student";
import ExpressError from "../helper/ExpressError";
import StudentService from '../service/student'
import jwt from "jsonwebtoken";



declare global {
	namespace Express {
		export interface Request {
			student_username?: string;
		}
	}
}


// [POST] /signup
const signup = async (req: Request, res: Response): Promise<void> => {
	const student: Student = req.body.student;

	const needs_hashing = student.student_password + (process.env.BCRYPT_PEPPER as string);
	const salt_rounds: number = parseInt(process.env.SALT_ROUNDS as string);
	student.hashed_password = await bcrypt.hashSync(needs_hashing, salt_rounds)
	
	const studentStore = new StudentStore();
	const result = await studentStore.create(student);
	
	const AccessToken = await StudentService.sign(student.student_username);
	res.send({ AccessToken });
};




// [POST] /login
const login = async (req: Request, res: Response): Promise<void> => {
	const {student_username, student_password} = req.body.student;

	const needs_hashing = student_password + (process.env.BCRYPT_PEPPER as string);
	const studentStore = new StudentStore();
	const result = await studentStore.show(student_username);

	if(!result.length) throw new ExpressError("User Not Found", 404); 
	
	const student = result[0];
	const password_comparison = await bcrypt.compareSync(needs_hashing, student.hashed_password)

	if(!password_comparison) throw new ExpressError('Incorrect Password', 403)
	
	const AccessToken = await StudentService.sign(student.student_username);
	res.send({ AccessToken });
};



const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.headers.authorization) throw new ExpressError("Unauthorized, Please Login", 403);
	
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) throw new ExpressError("Unauthorized, Please Login", 403);

	const access_token_secret = process.env.ACCESS_TOKEN_SECRET as string;

	let jwt_payload: { student_username: string; iat: number; exp: number };
	try{
		jwt_payload = (await jwt.verify(token, access_token_secret)) as unknown as {student_username: string; iat: number;exp: number;};
	}
	catch(e){
		// @ts-ignore
		throw new ExpressError(e.message + ', Please log in again', 403)
	}
	req.student_username  = jwt_payload.student_username;

	return next();
}


export default {
	signup,
	login,
	isAuthenticated
};


