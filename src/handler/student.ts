import { NextFunction, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../model/user";
import Student from "../model/student";
import ExpressError from "../helper/ExpressError";
import { sign } from '../service/student'
import Config from "../config";
import StudentJoiSchema from "../schema/student"
import sequelize from "../model/database";
import Request from "../@types/express"
import LoggedJwt from "../model/logged_jwt";



// [POST] /students
const signup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const student = (await StudentJoiSchema.validateAsync(req.body)).student;

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

		const result = await Student.create(student, {transaction});
		await transaction.commit();
	}
	catch(e: unknown){
		await transaction.rollback();
		throw e;
	}
	
	const AccessToken = await sign(student.student_username);
	res.status(201).send({ AccessToken });
};


const remove = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const { student_username } = req.params;

	if(req.student_username != student_username){
		throw new ExpressError("Unauthorized Request", 403);
	}

	const result = await Student.destroy({where: {student_username}});

	if (result != 1) throw new ExpressError("User not found", 404);
	res.status(200).send({ msg: "Student removed successfully" });
};




// [POST] /login
const login = async (req: Request, res: Response): Promise<void> => {
	const { student_username, student_password } = req.body.student;

	const needs_hashing = student_password + Config.bcrypt_pepper;

	const student = await Student.findByPk(student_username);

	if (!student) throw new ExpressError('Wrong username or password', 403);

	const password_comparison = await bcrypt.compareSync(needs_hashing, student.getDataValue("hashed_password"))

	if (!password_comparison) throw new ExpressError('Wrong username or password', 403);

	const AccessToken = await sign(student_username);
	res.send({ AccessToken });
};


// [POST] /logout
const logout = async (req: Request, res: Response): Promise<void> => {
	if (!req.headers.authorization) throw new ExpressError("Unauthorized, please login first", 401)
	const token = req.headers.authorization?.split(' ')[1];

	await LoggedJwt.destroy({ where: { token } });
	if (req.student_username) delete req["student_username"];

	res.status(200).send({ msg: "Logged out successfully" });
};






export default {
	signup,
	login,
	logout,
	remove
};


