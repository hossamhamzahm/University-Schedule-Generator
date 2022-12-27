import { Request, Response } from "express";
import { Section, SectionStore } from "../model/section";




// [GET] /sections?pageNO=1&limit=15
const index = async(req: Request, res: Response): Promise<void> => {
    const {pageNo = '1', limit = '20'} = req.query;
    
    const sectionStore = new SectionStore();
    const sections = await sectionStore.index(parseInt(pageNo as string), parseInt(limit as string));
    res.send(sections)
}



// [GET] /sections/:course_code/:section_name/:section_type
const show = async (req: Request, res: Response): Promise<void> => {
	const { course_code, section_name, section_type } = req.params;

	const sectionStore = new SectionStore();
	const section = await sectionStore.show(course_code, section_name, section_type);
	res.send(section);
};


const showCourseSections = async (req: Request, res: Response): Promise<void> => {
	const { course_code } = req.params;

	const sectionStore = new SectionStore();
	const section = await sectionStore.showCourseSections(course_code);
	res.send(section);
};



// [POST] /sections
const create = async (req: Request, res: Response): Promise<void> => {
	const section: Section = req.body.section;

	const sectionStore = new SectionStore();
	const result = await sectionStore.create(section);
	res.send(result);
};



const update = async (req: Request, res: Response): Promise<void> => {
	const { course_code, section_name, section_type } = req.params;

	const sectionStore = new SectionStore();
	const section = await sectionStore.update(course_code, section_name, section_type, req.body.section);
	res.send(section);
};



const remove = async (req: Request, res: Response): Promise<void> => {
	const { course_code, section_name, section_type } = req.params;

	const sectionStore = new SectionStore();
	const section = await sectionStore.delete(course_code, section_name, section_type);
	res.send(section);
};



export default {
	index,
	show,
	showCourseSections,
	create,
	update,
	remove,
};