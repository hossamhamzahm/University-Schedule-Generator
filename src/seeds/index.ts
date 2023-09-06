import Course from "../model/course";
import Instructor from "../model/instructor";
import SectionInterface from "../@types/section";
import Section from "../model/section";
import User from "../model/user";
import parse from "./parseCourses";





let sections: SectionInterface[] = [];



const code: {
	[key: string]: string;
} = {};

const instructor_name: {
	[key: string]: string;
} = {};


let main = async (): Promise<void> => {
	sections = await parse();

	sections.forEach((section: SectionInterface, idx: number) => {
		code[section.course_code] = section.course_name || "NULL";
		if (section.instructor_name) {
			instructor_name[section.instructor_name] = section.instructor_name.replaceAll(" ", ".");
			section.instructor_username = section.instructor_name.replaceAll(" ", ".");
		}
	});

	// this part seeds the instructor and user models

	for (let full_name in instructor_name) {
		const user = await User.create({
			user_username: instructor_name[full_name].slice(0, Math.min(instructor_name[full_name].length, 30)),
			f_name: full_name.split(' ')[0],
			m_name: full_name.split(' ')[1],
			l_name: full_name.split(' ')[2],
		});

		const instructor = Instructor.create({
			instructor_username: user.getDataValue('user_username'),
			instructor_faculty: "EAS"
		})
	}

	// this part seeds the course model
	for (let course_code in code) {
		await Course.create({ course_code: course_code, course_name: code[course_code] });
	}


	// this part seeds the sections model
	for (let section of sections) {
		delete section.course_name;
		delete section.instructor_name;

		if (section.instructor_username)
			section.instructor_username = section.instructor_username.slice(0, Math.min(section.instructor_username.length, 30));

		await Section.create({ ...section });
	}

	console.log("\n\nSeeding finished, press ctrl + c to exit.")
}


main();