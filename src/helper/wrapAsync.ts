const wrapAsync = function <T>(fn: (...args: any[]) => Promise<T>): (...args: any[]) => Promise<T> {
	return async (...args: any[]) => {
		try{
		return await fn(...args);
		}
		catch(e: unknown){
		    // if(process.env.ENV  == 'dev') console.error("An error happened:", (e as Error).message);
            // if(args[1]) return args[1].status(500).send({ error: e });
			
			// @ts-ignore
			if(e.sqlMessage) e.msg = e.sqlMessage;
			if(args[2]) args[2](e)
		}
	};
};

export default wrapAsync;
