import { Request, Response, NextFunction } from "express";


const pagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let { pageNo = "1", limit = "20", q = undefined } = req.query;
    const offset = (parseInt(pageNo as string) - 1) * parseInt(limit as string);


    const results = {
        pagination: {
            pageNo,
            limit,
            totalNumber: 0
        },
        results: []
    }

    res.locals.results = results;
    next();
}

export default pagination;