import express from "express";
import scheduleHandler from "../handler/schedule";
import wrapAsync from "../helper/wrapAsync";
const router: express.Router = express.Router();
import studentHandler from "../handler/student";


// [POST] /schedules
router.post("/", wrapAsync(studentHandler.isAuthenticated), wrapAsync(scheduleHandler.generate));

// [POST] /schedules/register
router.post("/", wrapAsync(studentHandler.isAuthenticated), wrapAsync(scheduleHandler.register));

export default router;