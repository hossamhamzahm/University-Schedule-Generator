import express from "express";
import cors from "cors";
import ExpressError from "./helper/ExpressError";
import Config from "./config";
import https from "https"
import fs from "fs"
import path from "path";


import CourseRouter from "./router/course";
import SectionRouter from "./router/section";
import InstructorRouter from "./router/instructor";
import StudentRouter from "./router/student";
import ScheduleRouter from "./router/schedule";
import VisitRouter from "./router/visitCount";





const app: express.Application = express();
app.use(express.urlencoded({ extended: true }), express.json(), cors());


import swaggerUi from "swagger-ui-express";
import swaggerJSDOC from "swagger-jsdoc";
import swaggerOptions from "./config/swagger/swaggerOptions";
import migrate from "./model/migrate";
const swaggerSpec = swaggerJSDOC(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use("/courses", CourseRouter);
app.use("/sections", SectionRouter);
app.use("/instructors", InstructorRouter);
app.use("/schedules", ScheduleRouter);
app.use("/visits", VisitRouter);
app.use("/", StudentRouter);



// Catching falsy endpoints
app.get("*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return next(new ExpressError("Endpoint not found!", 404))
});



// Express Error handler
app.use((err: ExpressError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {msg = "Internal Server Error", status = 500} = err; 

    console.log(err)
    
    // console.log("Error", err.msg) 
	// console.error(err.stack);
	res.status(status).send({error: {
        msg,
        status
    }});
});





if(process.env.NODE_ENV === "prod"){
    const sslServer = https.createServer({
        key: fs.readFileSync(path.join(__dirname, "..", "cert", "privkey.pem")),
        cert: fs.readFileSync(path.join(__dirname, "..", "cert", "fullchain.pem")),
    }, app)
    
    
    
    sslServer.listen(Config.port, async () => {
        await migrate();
        if (process.env.NODE_ENV != "test")
            console.log(`Server is listening on port: ${Config.port}`);
    });
}
else{
    app.listen(Config.port, async() => {
        await migrate()
        console.log("[New Build] Listening on port", Config.port)
    });
}

export default app;