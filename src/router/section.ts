import express from "express";
import sectionHandler from "../handler/section";
import wrapAsync from "../helper/wrapAsync";
const router: express.Router = express.Router();
import studentHandler from "../handler/student";


/**
 * @swagger
 *  components:
 *    schemas:
 *      section:
 *        type: object
 *        properties:
 *          section_id:
 *            type: integer
 *          course_code:
 *            type: string
 *          section_name: 
 *            type: string
 *          section_type: 
 *            type: string
 *          section_day: 
 *            type: string
 *          section_from: 
 *            type: string
 *          section_to: 
 *            type: string
 *          instructor_username: 
 *            type: string
 */





/**
 * @swagger
 * /sections:
 *  get:
 *      tags: 
 *          - Sections
 *      summary: this endpoint gets all the sections
 *      description: the number of sections returned is dependent on the limit parameter
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
 *                              $ref: '#components/schemas/section'
 */
// [GET] /section?pageNo=1&limit=15
router.get("/", wrapAsync(sectionHandler.index));



/**
 * @swagger
 * /sections/{course_code}/{section_name}/{section_type}:
 *  get:
 *      tags: 
 *          - Sections
 *      summary: this endpoint gets all the sections
 *      description: the number of sections returned is dependent on the limit parameter
 *      parameters:
 *          - in: path
 *            name: course_code
 *            type: string
 *            required: true
 *          - in: path
 *            name: section_name
 *            type: string
 *            required: true
 *          - in: path
 *            name: section_type
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
 *                              $ref: '#components/schemas/section'
 */
// [GET] /sections/:course_code/:section_name/:section_type
router.get("/:course_code/:section_name/:section_type", wrapAsync(sectionHandler.show));





/**
 * @swagger
 * /sections/{course_code}:
 *  get:
 *      tags: 
 *          - Sections
 *      summary: this endpoint gets all the sections for one specific course
 *      description: this endpoint gets all the sections for one specific course
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
 *                              $ref: '#components/schemas/section'
 */
// [GET] /sections/:course_code
router.get("/:course_code", wrapAsync(sectionHandler.showCourseSections));




/**
 * @swagger
 * /sections:
 *  post:
 *      tags: 
 *          - Sections
 *      summary: this endpoint is used to create new sections
 *      description: |-
 *                This endpoint is used to create new sections <br> <br>
 *                Note: <br>
 *                You should not include a section_id in the request, it will be generated automatically in the backend
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object 
 *                      properties:
 *                        section:
 *                          $ref: '#components/schemas/section'
 *      responses:
 *          200:
 *              description: OK, course created successfully
 *      
 */
// [POST] /sections
router.post("/", wrapAsync(studentHandler.isAuthenticated), wrapAsync(sectionHandler.create));


/**
 * @swagger
 * /sections/{course_code}/{section_name}/{section_type}:
 *  patch:
 *      tags: 
 *          - Sections
 *      summary: this endpoint is used to edit sections
 *      description: this endpoint is used to edit sections
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: course_code
 *            type: string
 *            required: true
 *          - in: path
 *            name: section_name
 *            type: string
 *            required: true
 *          - in: path
 *            name: section_type
 *            type: string
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object 
 *                      properties:
 *                        section:
 *                          $ref: '#components/schemas/section'
 *      responses:
 *          200: 
 *              description: valid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/section'
 */
// [PATCH] /sections/:course_code/:section_name/:section_type
router.patch(
	"/:course_code/:section_name/:section_type",
	wrapAsync(studentHandler.isAuthenticated),
	wrapAsync(sectionHandler.update)
);




/**
 * @swagger
 * /sections/{course_code}/{section_name}/{section_type}:
 *  delete:
 *      tags: 
 *          - Sections
 *      summary: this endpoint is used to delete sections
 *      description: this endpoint is used to delete sections
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: course_code
 *            type: string
 *            required: true
 *          - in: path
 *            name: section_name
 *            type: string
 *            required: true
 *          - in: path
 *            name: section_type
 *            type: string
 *            required: true
 *      responses:
 *          200: 
 *              description: OK, section deleted successfully
 */
// [DELETE] /sections/:course_code/:section_name/:section_type
router.delete(
	"/:course_code/:section_name/:section_type",
	wrapAsync(studentHandler.isAuthenticated),
	wrapAsync(sectionHandler.remove)
);


export default router;