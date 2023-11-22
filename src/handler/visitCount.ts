import { Op } from "sequelize";
import ExpressError from "../helper/ExpressError";
import { Request, Response, NextFunction } from "express";
import VisitCount from "../model/visitCount";


// [GET] /visits
const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const visit_cnt = await VisitCount.findOne();
	res.send(visit_cnt)
}



export default{
    index,
}