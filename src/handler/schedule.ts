import { Request, Response, NextFunction } from "express";
import NeededCoursesJoiSchema from "../schema/needed_courses";
import generate_tables from "../model/generate_tables_algorithm/generate_tables";




// [GET] /sections?pageNO=1&limit=15
// const index = async(req: Request, res: Response): Promise<void> => {
//     const {pageNo = '1', limit = '20'} = req.query;
    
//     const sectionStore = new SectionStore();
//     const sections = await sectionStore.index(parseInt(pageNo as string), parseInt(limit as string));
//     res.send(sections)
// }




// [POST] /sections
const generate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	let { pageNo = "1", limit = "20" } = req.query;
	
	const strt = (parseInt(pageNo as string) - 1) * parseInt(limit as string);
	const ed = strt + parseInt(limit as string) -1;

	const needed_courses = (await NeededCoursesJoiSchema.validateAsync(req.body)).needed_courses;
	const schedules = await generate_tables(needed_courses);
	
	console.log("Number of generated schedules:", schedules.length)

	let responses = [];

	if(strt < schedules.length){
		if (schedules.length >= ed) responses = schedules.slice(strt, ed);
		else responses = schedules.slice(strt);
	}
	else responses = schedules;


	res.locals.results.pagination.totalNumber = schedules.length;
	res.locals.results.results = responses;
	res.send(res.locals.results);
};



// [POST] /sections/register
// const register = async (req: Request, res: Response): Promise<void> => {
// 	const schedules = await generate_tables(req.body.needed_courses);
	
// 	console.log(schedules.length)
// 	let responses = [];
// 	if(schedules.length > 20) responses = schedules.slice(0, 21);
// 	else responses = schedules;

// 	res.send(responses)
// };


export default {
	generate,
	// register,
};