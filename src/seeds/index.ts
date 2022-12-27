import { CourseStore } from "../model/course";
import { InstructorStore, Instructor } from "../model/instructor";
import { Section, SectionStore } from "../model/section";
import { User, UserStore } from "../model/user";
import parse from "./parseCourses";


let sections: Section[] = [];



const code: {
    [key: string]: string;
} = {};

const instructor_name: {
    [key: string]: string;
} = {};

const user: User = {
	user_username: "string",
	f_name: "string",
	m_name: "string",
	l_name: "string"
}

let main = async(): Promise<void> => {
	sections = await parse();

	sections.forEach((section: Section, idx: number) => {
		code[section.course_code] = section.course_name || "NULL";
		if (section.instructor_name) {
			instructor_name[section.instructor_name] = section.instructor_name.replaceAll(" ", ".");
			section.instructor_username = section.instructor_name.replaceAll(" ", ".");
		}
	});

	// this part seeds the instructor and user models
	const userStore = new UserStore();
	const instructorStore = new InstructorStore()
	for(let full_name in instructor_name){
        user.user_username = instructor_name[full_name].slice(0, Math.min(instructor_name[full_name].length, 30));
        [user.f_name, user.m_name, user.l_name] = full_name.split(' ');

        await instructorStore.create({instructor_username: user.user_username,
			f_name: user.f_name,
			m_name: user.m_name,
			l_name: user.l_name,
			instructor_faculty: "EAS"})
	}

	// this part seeds the course model
	const courseStore = new CourseStore();
	for(let course_code in code){
            await courseStore.create({ course_code: course_code, course_name: code[course_code] });
	}


	// this part seeds the sections model
    const sectionStore = new SectionStore();
	for (let section of sections) {
		delete section.course_name;
		delete section.instructor_name;

        if(section.instructor_username)
            section.instructor_username = section.instructor_username.slice(0, Math.min(section.instructor_username.length, 30));

        await sectionStore.create(section);
	}

	console.log("\n\nSeeding finished, press ctrl + c to exit.")
}


main();