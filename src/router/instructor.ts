import express from "express";
import InstructorHandler from "../handler/instructor";
import wrapAsync from "../helper/wrapAsync";
import { isAuthenticated } from "../service/student";
const router: express.Router = express.Router();


// [GET] /instructors?pageNo=1&limit=15
router.get("/", wrapAsync(InstructorHandler.index));

// [GET] /instructors/:instructor_username
router.get("/:instructor_username", wrapAsync(InstructorHandler.show));


// [POST] /instructors
router.post("/", wrapAsync(isAuthenticated), wrapAsync(InstructorHandler.create));



// [PATCH] /instructors/:instructor_username
router.patch("/:instructor_username", wrapAsync(isAuthenticated), wrapAsync(InstructorHandler.update));

// [DELETE] /instructors/:instructor_username
router.delete("/:instructor_username", wrapAsync(isAuthenticated), wrapAsync(InstructorHandler.remove));

export default router;
