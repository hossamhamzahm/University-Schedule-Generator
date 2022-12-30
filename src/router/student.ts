import express from "express";
import StudentHandler from "../handler/student";
import wrapAsync from "../helper/wrapAsync";
const router: express.Router = express.Router();


/**
 * @swagger
 *  components:
 *      securitySchemes:
 *        BearerAuth:
 *          type: http
 *          scheme: bearer
 *      schemas:
 *          student:
 *              type: object
 *              properties:
 *                  student_username:
 *                      type: string
 *                  f_name:
 *                      type: string
 *                  m_name:
 *                      type: string
 *                  l_name:
 *                      type: string
 *                  student_major:
 *                      type: string
 *                  student_password:
 *                      type: string
 */
/**
 * @swagger
 * /login:
 *  post:
 *      tags:
 *          - Student
 *      summary: this endpoint is used to log users in
 *      description: this endpoint is used to log users in
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        student:
 *                          type: object
 *                          properties:
 *                            student_username:
 *                              type: string
 *                            student_password:
 *                              type: string
 *      responses:
 *          200:
 *              description: OK, user authenticated successfully
 */
// [post] /login
router.post("/login", wrapAsync(StudentHandler.login));

/**
 * @swagger
 * /signup:
 *  post:
 *      tags:
 *          - Student
 *      summary: This endpoint is used to create new students
 *      description: This endpoint is used to create new students
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        student:
 *                          $ref: '#components/schemas/student'
 *      responses:
 *          200:
 *              description: OK, student created successfully
 */
// [post] /signup
router.post("/signup", wrapAsync(StudentHandler.signup));



export default router;
