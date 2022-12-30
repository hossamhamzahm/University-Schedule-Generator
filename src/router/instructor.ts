import express from "express";
import InstructorHandler from "../handler/instructor";
import wrapAsync from "../helper/wrapAsync";
import studentHandler from "../handler/student";
const router: express.Router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          instructor:
 *              type: object
 *              properties:
 *                  instructor_username:
 *                      type: string
 *                  f_name:
 *                      type: string
 *                  m_name:
 *                      type: string
 *                  l_name:
 *                      type: string
 *                  instructor_faculty:
 *                      type: string
 */

/**
 * @swagger
 * /instructors:
 *  get:
 *      tags:
 *          - Instructors
 *      summary: this endpoint gets all the instructors
 *      description: the number of instructors returned is dependent on the limit parameter
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
 *                              $ref: '#components/schemas/instructor'
 */
// [GET] /instructors?pageNo=1&limit=15
router.get("/", wrapAsync(InstructorHandler.index));

/**
 * @swagger
 * /instructors/{instructor_username}:
 *  get:
 *      tags:
 *          - Instructors
 *      summary: This endpoint shows a detailed instructor description
 *      description: This endpoint shows a detailed instructor description
 *      parameters:
 *          - in: path
 *            name: instructor_username
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
 *                              $ref: '#components/schemas/instructor'
 */
// [GET] /instructors/:instructor_username
router.get("/:instructor_username", wrapAsync(InstructorHandler.show));


/**
 * @swagger
 * /instructors:
 *  post:
 *      tags:
 *          - Instructors
 *      summary: this endpoint is used to create new instructors
 *      description: this endpoint is used to create new instructors
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        instructor:
 *                          $ref: '#components/schemas/instructor'
 *      responses:
 *          200:
 *              description: OK, instructor created successfully
 *
 */
// [POST] /instructors
router.post("/", wrapAsync(studentHandler.isAuthenticated), wrapAsync(InstructorHandler.create));


/**
 * @swagger
 * /instructors/{instructor_username}:
 *  patch:
 *      tags:
 *          - Instructors
 *      summary: this endpoint is used to create new instructors
 *      description: this endpoint is used to create new instructors
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: instructor_username
 *            type: string
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        instructor:
 *                          $ref: '#components/schemas/instructor'
 *      responses:
 *          200:
 *              description: OK, instructor updated successfully
 */
// [PATCH] /instructors/:instructor_username
router.patch("/:instructor_username", wrapAsync(studentHandler.isAuthenticated), wrapAsync(InstructorHandler.update));

/**
 * @swagger
 * /instructors/{instructor_username}:
 *  delete:
 *      tags:
 *          - Instructors
 *      summary: this endpoint is used to delete instructors
 *      description: this endpoint is used to delete instructors
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: instructor_username
 *            type: string
 *            required: true
 *      responses:
 *          200:
 *              description: OK, instructor deleted successfully
 *
 */
// [DELETE] /instructors/:instructor_username
router.delete("/:instructor_username", wrapAsync(studentHandler.isAuthenticated), wrapAsync(InstructorHandler.remove));

export default router;
