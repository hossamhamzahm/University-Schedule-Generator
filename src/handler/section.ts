import { Request, Response, NextFunction } from "express";
import Section from "../model/section";
import SectionJoiSchema from "../schema/section";
import ExpressError from "../helper/ExpressError";
import Course from "../model/course";
import { Model, Op, literal } from "sequelize";



const pagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	let { pageNo = "1", limit = "20", q = undefined } = req.query;
	const offset = (parseInt(pageNo as string) - 1) * parseInt(limit as string);


	const results = {
		pagination: {
			pageNo,
			limit,
			totalNumber: 0
		},
		results: []
	}

	res.locals.results = results;
	next();
}

// [GET] /sections?pageNO=1&limit=15
const index = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
	let { pageNo = "1", limit = "20", q = undefined } = req.query;

	let where: {[key: string]: any} = {};
	
	if(q){
		const sub_where = {
			[Op.or]: [
				{ course_name: { [Op.like]: `%${q}%` } },
				{ course_code: { [Op.like]: `%${q}%` } }
			]
		}

		const courses = (await Course.findAll({where: sub_where})).map(course => course.getDataValue('course_code'));
		where['course_code'] = { [Op.in]: courses };
	}

	const sections = await Section.findAndCountAll({
		offset: (parseInt(pageNo as string) - 1) * parseInt(limit as string),
		limit: parseInt(limit as string),
		where,
	});	

	res.locals.results.pagination.totalNumber = sections.count;
	res.locals.results.results = sections.rows;

	res.status(200).send(res.locals.results)
	// res.status(200).send(sections)
}



// [GET] /sections/:course_code/:section_name/:section_type
const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { course_code, section_name, section_type } = req.params;

	const section = await Section.findOne({where: {course_code, section_name, section_type}});
	if (!section) throw new ExpressError("Section not found", 404);

	res.send(section);
};


const showCourseSections = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { course_code } = req.params;

	const section = await Section.findAll({where: {course_code}});

	res.send(section);
};



// [POST] /sections
const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const section = (await SectionJoiSchema.validateAsync(req.body)).section;

	const course = await Course.findOrCreate({
		where: {course_code: section.course_code}, 
		defaults: { course_code: section.course_code, course_name: section.course_code }
	})
	const result = await Section.create(section);

	res.status(201).send({msg: "Section created successfully"});
};



const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { course_code, section_name, section_type } = req.params;

	const section = await Section.update(
		{section: req.body.section},
		{where: { course_code, section_name, section_type }}
	);

	res.send({ msg: "Section updated successfully" });
};



const remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { course_code, section_name, section_type } = req.params;

	const section = await Section.destroy({where: {course_code, section_name, section_type}});
	
	res.send({ msg: "Section deleted successfully" });
};



export default {
	index,
	show,
	pagination,
	showCourseSections,
	create,
	update,
	remove,
};