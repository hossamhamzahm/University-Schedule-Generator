import express from 'express'
import CourseHandler from '../handler/course';
import wrapAsync from '../helper/wrapAsync';
import { isAuthenticated } from '../service/student'
import pagination from '../service/pagination';
const router: express.Router = express.Router();




// [GET] /courses?pageNo=1&limit=15
router.get("/", wrapAsync(pagination), wrapAsync(CourseHandler.index));

// [GET] /courses/:course_code
router.get("/:course_code", wrapAsync(CourseHandler.show));

// [POST] /courses
router.post("/", wrapAsync(isAuthenticated), wrapAsync(CourseHandler.create));

// [PATCH] /courses/course_code
router.patch("/:course_code", wrapAsync(isAuthenticated), wrapAsync(CourseHandler.update));

// [DELETE] /courses/:course_code
router.delete("/:course_code", wrapAsync(isAuthenticated), wrapAsync(CourseHandler.remove));


export default router;