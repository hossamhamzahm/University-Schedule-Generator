import { Instructor, InstructorStore } from "../model/instructor";
import { Request, Response } from "express";



// [GET] /instructors?pageNO=1&limit=15
const index = async (req: Request, res: Response): Promise<void> => {
	const { pageNo = "1", limit = "20" } = req.query;

	const instructorStore = new InstructorStore();
	const instructors = await instructorStore.index(parseInt(pageNo as string), parseInt(limit as string));
	res.send(instructors);
};

// [GET] /instructors/:instructor_username
const show = async (req: Request, res: Response): Promise<void> => {
	const instructor_username = req.params.instructor_username;

	const instructorStore = new InstructorStore();
	const instructor = await instructorStore.show(instructor_username);
	res.send(instructor);
};


// [POST] /instructors
const create = async (req: Request, res: Response): Promise<void> => {
	const instructor: Instructor = req.body.instructor;

	const instructorStore = new InstructorStore();
	const result = await instructorStore.create(instructor);
	res.send("OK, instructor created successfully");
};


// [PATCH] /instructors/instructor_username
const update = async (req: Request, res: Response): Promise<void> => {
	const { instructor } = req.body;
	const instructor_username = req.params.instructor_username;

	const instructorStore = new InstructorStore();
	const result = await instructorStore.update(instructor_username, instructor);
	res.send(result);
};

// [DELETE] /instructors/instructor_username
const remove = async (req: Request, res: Response): Promise<void> => {
	const instructor_username = req.params.instructor_username;

	const instructorStore = new InstructorStore();
	const result = await instructorStore.remove(instructor_username);
	res.send(result);
};

export default {
	index,
	show,
	create,
	update,
	remove,
};
