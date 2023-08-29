import User from "./user";
import Student from "./student";
// import LoggedJwt from "./loggedJwt";
// import ErrorLog from "./error_log";
import config from "../config";
// import bcrypt from "bcrypt";
import sequelize from "./database";
// import error_log_scheduler from "../service/jobs/error_log_scheduler";





const migrate = async (force = false) => {
	if(force){
		await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
	}

	await User.sync({ force });
	await Student.sync({ force });


	if(force){
		await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
		process.exit(0);
	}
}


if (require.main === module) {
	migrate(true);
}

export default migrate;