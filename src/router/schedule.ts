import express from "express";
import scheduleHandler from "../handler/schedule";
import wrapAsync from "../helper/wrapAsync";
const router: express.Router = express.Router();
import studentHandler from "../handler/student";

/**
 * @swagger
 *  components:
 *    schemas:
 *      schedule:
 *        type: object
 *        properties:
 *          sunday:
 *            $ref: '#components/schemas/section'
 *          monday:
 *            $ref: '#components/schemas/section'
 *          tuesday:
 *            $ref: '#components/schemas/section'
 *          wednesday:
 *            $ref: '#components/schemas/section'
 *          thursday:
 *            $ref: '#components/schemas/section'
 */

/**
 * @swagger
 * /schedules:
 *  post:
 *      tags:
 *          - Schedules
 *      summary: this endpoint generates all possible schedules of the specified list of courses
 *      description: this endpoint generates all possible schedules of the specified list of courses
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object 
 *                      properties:
 *                        needed_courses:
 *                          type: array
 *                          items:
 *                            type: string
 *                          example: ["courseCode", "courseCode"]
 *      responses:
 *          200:
 *              description: valid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/schedule'
 */
// [GET] /section?pageNo=1&limit=15
router.post("/", wrapAsync(studentHandler.isAuthenticated), wrapAsync(scheduleHandler.generate));


export default router;