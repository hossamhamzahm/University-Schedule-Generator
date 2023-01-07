import express from "express";
import path from "path";
import cors from "cors";
import ExpressError from "./helper/ExpressError";


import CourseRouter from "./router/course";
import SectionRouter from "./router/section";
import InstructorRouter from "./router/instructor";
import StudentRouter from "./router/student";
import ScheduleRouter from "./router/schedule";


import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", ".env") });


const app: express.Application = express();
app.use(express.urlencoded({ extended: true }), express.json(), cors());


import swaggerUi from "swagger-ui-express";
import swaggerJSDOC from "swagger-jsdoc";
import swaggerOptions from "./swaggerOptions";
const swaggerSpec = swaggerJSDOC(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use("/courses", CourseRouter);
app.use("/sections", SectionRouter);
app.use("/instructors", InstructorRouter);
app.use("/schedules", ScheduleRouter);
app.use("/", StudentRouter);



// Catching falsy endpoints
app.get("*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return next(new ExpressError("Endpoint not found!", 404))
});



// Express Error handler
app.use((err: ExpressError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {msg = "Internal Server Error", status = 500} = err; 
    
    // console.log("Error", err.msg) 
	// console.error(err.stack);
	res.status(status).send({error: {
        msg,
        status
    }});
});



const port = process.env.PORT || 3030;
app.listen(port, () => console.log("Listening on port", port));