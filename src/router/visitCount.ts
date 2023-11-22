import express from "express";
import VisitHandler from "../handler/visitCount"
const router = express.Router();


router.get('/', VisitHandler.index)


export default router;