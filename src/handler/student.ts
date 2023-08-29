import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import Student from "../model/student";
import ExpressError from "../helper/ExpressError";
import StudentService from '../service/student'
import jwt from "jsonwebtoken";
import Config from "../config";
import StudentJoiSchema from "../schema/student"
import sequelize from "../model/database";
import User from "../model/user";



declare global {
	namespace Express {
		export interface Request {
			student_username?: string;
		}
	}
}


// [POST] /signup
const signup = async (req: Request, res: Response): Promise<void> => {
	const student = await StudentJoiSchema.validateAsync(req.body);

	const needs_hashing = student.student_password + Config.bcrypt_pepper;
	student.hashed_password = await bcrypt.hashSync(needs_hashing, Config.salt_rounds)

	const transaction = await sequelize.transaction();
	try {
		const user = await User.create({ 
			user_username: student.student_username, 
			f_name: student.f_name,
			m_name: student.m_name,
			l_name: student.l_name, 
		}, { transaction });

		delete student['f_name'];
		delete student['m_name'];
		delete student['l_name'];

		const result = await Student.create(student);
	}
	catch(e: unknown){
		await transaction.rollback();
		throw e;
	}
	

	const AccessToken = await StudentService.sign(student.student_username);
	res.status(201).send({ AccessToken });
};




// [POST] /login
const login = async (req: Request, res: Response): Promise<void> => {
	const { student_username, student_password } = req.body.student;

	const needs_hashing = student_password + Config.bcrypt_pepper;

	const student = await Student.findOne({where: student_username});

	if (!student) throw new ExpressError("Student Not Found", 404);

	const password_comparison = await bcrypt.compareSync(needs_hashing, student.getDataValue("hashed_password"))

	if (!password_comparison) throw new ExpressError('Wrong username or password', 403)

	const AccessToken = await StudentService.sign(student_username);
	res.send({ AccessToken });
};



// const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// 	if (!req.headers.authorization || req.headers.authorization.split(' ').length !== 2) throw new ExpressError("Unauthorized, Please Login", 403);

// 	const token = req.headers.authorization.split(' ')[1];

// 	let jwt_payload: { student_username: string; iat: number; exp: number };
// 	try {
// 		jwt_payload = (await jwt.verify(token, Config.access_token_secret)) as unknown as { student_username: string; iat: number; exp: number; };
// 	}
// 	catch (e) {
// 		// @ts-ignore
// 		throw new ExpressError(e.message + ', Please log in again', 403)
// 	}
// 	req.student_username = jwt_payload.student_username;

// 	return next();
// }


export default {
	signup,
	login,
	// isAuthenticated
};


