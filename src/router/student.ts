import express from "express";
import StudentHandler from "../handler/student";
import wrapAsync from "../helper/wrapAsync";
const router: express.Router = express.Router();


// [post] /login
router.post("/login", wrapAsync(StudentHandler.login));

// [post] /signup
router.post("/signup", wrapAsync(StudentHandler.signup));



export default router;
