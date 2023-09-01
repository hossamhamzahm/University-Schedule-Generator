import User from "./user";
import Student from "./student";
// import LoggedJwt from "./loggedJwt";
// import ErrorLog from "./error_log";
// import config from "../config";
// import bcrypt from "bcrypt";
import sequelize from "./database";
import LoggedJwt from "./logged_jwt";
import Instructor from "./instructor";
import Course from "./course";
import Section from "./section";
import Day from "./day";
import Schedule from "./schedule";
// import error_log_scheduler from "../service/jobs/error_log_scheduler";





const migrate = async (force = false) => {
	if(force){
		await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
	}

	await User.sync({ force });
	await Student.sync({ force });
	await LoggedJwt.sync({ force });
	await Instructor.sync({ force });
	await Course.sync({ force });
	await Section.sync({ force });
	await Day.sync({ force });
	await Schedule.sync({ force });


	if(force){
		await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
		process.exit(0);
	}
}


if (require.main === module) {
	migrate(true);
}

export default migrate;