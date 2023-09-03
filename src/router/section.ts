import express from "express";
import sectionHandler from "../handler/section";
import wrapAsync from "../helper/wrapAsync";
const router: express.Router = express.Router();
import { isAuthenticated } from "../service/student";




// [GET] /section?pageNo=1&limit=15
router.get("/", wrapAsync(sectionHandler.pagination), wrapAsync(sectionHandler.index));

// [GET] /sections/:course_code/:section_name/:section_type
router.get("/:course_code/:section_name/:section_type", wrapAsync(sectionHandler.show));

// [POST] /sections
router.post("/", wrapAsync(isAuthenticated), wrapAsync(sectionHandler.create));

// [PATCH] /sections/:course_code/:section_name/:section_type
router.patch(
	"/:course_code/:section_name/:section_type",
	wrapAsync(isAuthenticated),
	wrapAsync(sectionHandler.update)
);

// [DELETE] /sections/:course_code/:section_name/:section_type
router.delete(
	"/:course_code/:section_name/:section_type",
	wrapAsync(isAuthenticated),
	wrapAsync(sectionHandler.remove)
);


export default router;