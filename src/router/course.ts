import express from 'express'
import CourseHandler from '../handler/course';
import wrapAsync from '../helper/wrapAsync';
const router: express.Router = express.Router();




/**
 * @swagger
 *  components:
 *      schemas:
 *          course:
 *              type: object
 *              properties:
 *                  course_code:
 *                      type: string 
 *                  course_name:
 *                      type: string
 */



/**
 * @swagger
 * /courses:
 *  get:
 *      tags: 
 *          - Courses
 *      summary: this endpoint gets all the course
 *      description: the number of courses returned is dependent on the limit parameter
 *      parameters:
 *          - in: query
 *            name: pageNo
 *            type: integer
 *            required: true
 *          - in: query
 *            name: limit
 *            type: integer
 *            required: true
 *      responses:
 *          200: 
 *              description: valid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/course'
 */
// [GET] /courses?pageNo=1&limit=15
router.get("/", wrapAsync(CourseHandler.index));



/**
 * @swagger
 * /courses/{course_code}:
 *  get:
 *      tags: 
 *          - Courses
 *      summary: This endpoint shows a detailed course description
 *      description: This endpoint shows a detailed course description
 *      parameters:
 *          - in: path
 *            name: course_code
 *            type: string
 *            required: true
 *      responses:
 *          200: 
 *              description: valid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/course'
 *                      example:
 *                          course:
 *                              course_code: 'ECEN424'
 *                              course_name: 'INTRODUCTION TO DATABASE MANAGEMENT SYSTEMS'
 */
// [GET] /courses/:course_code
router.get("/:course_code", wrapAsync(CourseHandler.show));



/**
 * @swagger
 * /courses:
 *  post:
 *      tags: 
 *          - Courses
 *      summary: this endpoint is used to create new courses
 *      description: this endpoint is used to create new courses
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object 
 *                      properties:
 *                        course:
 *                          $ref: '#components/schemas/course'
 *      responses:
 *          200:
 *              description: OK, course created successfully
 *      
 */
// [POST] /courses
router.post("/", wrapAsync(CourseHandler.create));


/**
 * @swagger
 * /courses/{course_code}:
 *  patch:
 *      tags: 
 *          - Courses
 *      summary: this endpoint is used to update courses
 *      description: this endpoint is used to update courses
 *      parameters:
 *          - in: path
 *            name: course_code
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object 
 *                      properties:
 *                        course:
 *                          $ref: '#components/schemas/course'
 *      responses:
 *          200:
 *              description: OK, course updated successfully
 *      
 */
// [PATCH] /courses/course_code
router.patch("/:course_code", wrapAsync(CourseHandler.update));


/**
 * @swagger
 * /courses/{course_code}:
 *  delete:
 *      tags: 
 *          - Courses
 *      summary: this endpoint is used to delete courses
 *      description: this endpoint is used to delete courses
 *      parameters:
 *          - in: path
 *            name: course_code
 *            required: true
 *      responses:
 *          200:
 *              description: OK, course deleted successfully
 *      
 */
// [DELETE] /courses/:course_code
router.delete("/:course_code", wrapAsync(CourseHandler.remove));


export default router;