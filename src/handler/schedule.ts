import { Request, Response } from "express";
import { Section, SectionStore } from "../model/section";
import generate_tables from "../model/generate_tables_algorithm/generate_tables";




// [GET] /sections?pageNO=1&limit=15
// const index = async(req: Request, res: Response): Promise<void> => {
//     const {pageNo = '1', limit = '20'} = req.query;
    
//     const sectionStore = new SectionStore();
//     const sections = await sectionStore.index(parseInt(pageNo as string), parseInt(limit as string));
//     res.send(sections)
// }




// [POST] /sections
const generate = async (req: Request, res: Response): Promise<void> => {
	const schedules = await generate_tables(req.body.needed_courses);
	
	console.log(schedules.length)
	let responses = [];
	if(schedules.length > 20) responses = schedules.slice(0, 21);
	else responses = schedules;

	res.send(responses)
};



// [POST] /sections/register
const register = async (req: Request, res: Response): Promise<void> => {
	const schedules = await generate_tables(req.body.needed_courses);
	
	console.log(schedules.length)
	let responses = [];
	if(schedules.length > 20) responses = schedules.slice(0, 21);
	else responses = schedules;

	res.send(responses)
};


export default {
	generate,
	register,
};