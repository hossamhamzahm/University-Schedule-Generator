import { Course, CourseStore } from "../model/course";
import { Request, Response } from "express";


// [GET] /courses?pageNO=1&limit=15
const index = async(req: Request, res: Response): Promise<void> => {
    const {pageNo = '1', limit = '20'} = req.query;
    
    const courseStore = new CourseStore();
    const courses = await courseStore.index(parseInt(pageNo as string), parseInt(limit as string));
    res.send(courses)
}

// [GET] /courses/:courseCode
const show = async (req: Request, res: Response): Promise<void> => {
	const courseCode = req.params.course_code;

	const courseStore = new CourseStore();
	const course = await courseStore.show(courseCode);
	res.send(course);
};



// [POST] /courses
const create = async (req: Request, res: Response): Promise<void> => {
	const course: Course = req.body.course;
            
	const courseStore = new CourseStore();
	const result = await courseStore.create(course);
	res.send("OK, course created successfully");
};


// [PATCH] /courses/courseCode
const update = async (req: Request, res: Response): Promise<void> => {
	const {course_name} = req.body.course;
    const course_code = req.params.course_code;

	const courseStore = new CourseStore();
	const result = await courseStore.update({ course_code, course_name });
	res.send(result);
};


// [DELETE] /courses/courseCode
const remove = async (req: Request, res: Response): Promise<void> => {
    const course_code = req.params.course_code;
    
	const courseStore = new CourseStore();
	const result = await courseStore.remove(course_code);
	res.send(result);
};



export default{
    index,
    show,
    create,
    update,
    remove,
}