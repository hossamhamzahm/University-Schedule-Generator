import express from "express";

export default function <T>(
	fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<T>
): (...args: any[]) => Promise<T | void> {
	return async (req, res, next) => {
		try {
			return await fn(req, res, next);
		} catch (e: unknown) {
            // @ts-ignore
            // console.log(e.message);

            // checking if this is a sequelize error
            // @ts-ignore
            if (e.errors && e.errors[0]) {
                e = {
                    // @ts-ignore
                    message: e.errors[0].message,
                    // @ts-ignore
                    sqlMessage: (e.parent ? e.parent.sqlMessage : null),
                    status: 403,
                    // @ts-ignore
                    stack: e.stack,
                };
            } else {
                e = {
                    // @ts-ignore
                    message: e.message,
                    // @ts-ignore
                    stack: e.stack,
                    // @ts-ignore
                    status: e.status,
                };
            }

            // until this line the stack is present

            // @ts-ignore
            e.user_db_id = req.user?.user_db_id || null;

            // creation of new ErrorLog row to generate a new id
            // @ts-ignore
            const error_id = await logger.transports[1].init();

            // @ts-ignore
            e.error_id = error_id;

            // @ts-ignore
            e.label = `Error ID: ${error_id}`;

            // this line updates the newly created ErrorLog with the error data
            // then logs it to different transports
            next(e);
        }
	};
}