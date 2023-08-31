import Instructor from "../model/instructor";
import sequelize from "../model/database";
import InstructorJoiSchema from "../schema/instructor";
import { Request, Response, NextFunction } from "express";
import User from "../model/user";
import ExpressError from "../helper/ExpressError";



// [GET] /instructors?pageNO=1&limit=15
const index = async (req: Request , res: Response,  next: NextFunction): Promise<void> => {
	let { pageNo = "1", limit = "20" } = req.query;

	const offset = (parseInt(pageNo as string) -1) * parseInt(limit as string);

	const instructors = await Instructor.findAll({ 
		offset, 
		limit: parseInt(limit as string),
		include: {
			model: User,
			required: true,
		},
	}
	);

	res.send(instructors);
};

// [GET] /instructors/:instructor_username
const show = async (req: Request , res: Response,  next: NextFunction): Promise<void> => {
	const instructor_username = req.params.instructor_username;

	const instructor = await Instructor.findOne({
		where: {instructor_username},
		include: {
			model: User,
			required: true,
		},
	})

	if(!instructor) throw new ExpressError("User not found", 404);
	res.send(instructor);
};


// [POST] /instructors
const create = async (req: Request , res: Response,  next: NextFunction): Promise<void> => {
	const instructor = (await InstructorJoiSchema.validateAsync(req.body)).instructor;

	const transaction = await sequelize.transaction();

	try {
		const user = await User.create({
			user_username: instructor.instructor_username,
			f_name: instructor.f_name,
			m_name: instructor.m_name,
			l_name: instructor.l_name,
		}, { transaction });

		delete instructor['f_name'];
		delete instructor['m_name'];
		delete instructor['l_name'];

		const result = await Instructor.create(instructor, { transaction });
		await transaction.commit();
	}
	catch (e: unknown) {
		await transaction.rollback();
		throw e;
	}

	res.status(201).send({msg: "OK, Instructor created successfully"});
};


// [PATCH] /instructors/instructor_username
const update = async (req: Request , res: Response,  next: NextFunction): Promise<void> => {
	const { instructor } = req.body;
	const instructor_username = req.params.instructor_username;

	const result = await Instructor.update({where: {instructor_username}}, instructor);
	res.send({ msg: "Instructor updated successfully"});
};


// [DELETE] /instructors/instructor_username
const remove = async (req: Request , res: Response,  next: NextFunction): Promise<void> => {
	const instructor_username = req.params.instructor_username;
	const result = await User.destroy({where: {user_username: instructor_username}});

	res.status(200).send({ msg: "Instructor deleted successfully" });
};

export default {
	index,
	show,
	create,
	update,
	remove,
};
