import express from "express";
import scheduleHandler from "../handler/schedule";
import wrapAsync from "../helper/wrapAsync";
const router: express.Router = express.Router();
import { isAuthenticated } from "../service/student";
import pagination from "../service/pagination";


// [POST] /schedules
router.post("/", /* isAuthenticated, */ wrapAsync(pagination), wrapAsync(scheduleHandler.generate));

// [POST] /schedules/register
// router.post("/", wrapAsync(studentHandler.isAuthenticated), wrapAsync(scheduleHandler.register));

export default router;