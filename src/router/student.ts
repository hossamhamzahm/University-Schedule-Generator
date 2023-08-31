import express from "express";
import StudentHandler from "../handler/student";
import wrapAsync from "../helper/wrapAsync";
import { isAuthenticated } from "../service/student";
const router: express.Router = express.Router();



// [post] /login
router.post("/login", wrapAsync(StudentHandler.login));

// [post] /logout
router.post("/logout", wrapAsync(StudentHandler.logout));


// [post] /students
router.delete("/students/:student_username", wrapAsync(isAuthenticated), wrapAsync(StudentHandler.remove));

// [post] /students
router.post("/students", wrapAsync(StudentHandler.signup));


export default router;