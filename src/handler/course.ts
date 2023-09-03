import { Op } from "sequelize";
import ExpressError from "../helper/ExpressError";
import Course from "../model/course";
import CourseJoiSchema from "../schema/course";
import { Request, Response, NextFunction } from "express";


// [GET] /courses?pageNO=1&limit=15
const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	let { pageNo = "1", limit = "20", q = undefined } = req.query;

	const offset = (parseInt(pageNo as string) - 1) * parseInt(limit as string);
	let where: { [key: string]: any } = {};

	if (q) {
		where = {
			[Op.or]: [
				{ course_name: { [Op.like]: `%${q}%` } },
				{ course_code: { [Op.like]: `%${q}%` } }
			]
		}
	}

	const courses = await Course.findAndCountAll({
		offset,
		limit: parseInt(limit as string),
		where
	});

	res.locals.results.pagination.totalNumber = courses.count;
	res.locals.results.results = courses.rows;
	res.send(res.locals.results)
}

// [GET] /courses/:courseCode
const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const courseCode = req.params.course_code;

	const course = await Course.findByPk(courseCode);
	if (!course) throw new ExpressError("Course not found", 404);

	res.send(course);
};



// [POST] /courses
const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const course = (await CourseJoiSchema.validateAsync(req.body)).course;

	const result = await Course.create(course);
	
	res.status(201).send({msg: "OK, course created successfully"});
};


// [PATCH] /courses/courseCode
const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const {course_name} = req.body.course;
    const course_code = req.params.course_code;

	const result = await Course.update({ course_name }, { where: { course_code } });

	res.status(200).send({ msg: "Course updated successfully"});
};


// [DELETE] /courses/courseCode
const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const course_code = req.params.course_code;
    
	const result = await Course.destroy({where: {course_code}});
	if(!result) throw new ExpressError("Course not found", 404);

	res.status(200).send({ msg: "Course deleted successfully" });
};



export default{
    index,
    show,
    create,
    update,
    remove,
}