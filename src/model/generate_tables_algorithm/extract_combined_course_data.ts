import Section from "../section";
import { DayPopulated, DayInterface } from "../../@types/day";
import { SchedulePopulated, ScheduleInterface } from "../../@types/schedule";
import { Model } from "sequelize";



const hour_to_idx = {
	"8:30:00": 0,
	"9:20:00": 0,
	"9:29:00": 0,
	"9:30:00": 1,
	"08:30:00": 0,
	"09:20:00": 0,
	"09:29:00": 0,
	"09:30:00": 1,
	"10:20:00": 1,
	"10:29:00": 1,
	"10:30:00": 2,
	"11:20:00": 2,
	"11:29:00": 2,
	"11:30:00": 3,
	"12:20:00": 3,
	"12:29:00": 3,
	"12:30:00": 4,
	"13:20:00": 4,
	"13:29:00": 4,
	"13:30:00": 5,
	"14:20:00": 5,
	"14:29:00": 5,
	"14:30:00": 6,
	"15:20:00": 6,
	"15:29:00": 6,
	"15:30:00": 7,
	"16:20:00": 7,
	"16:29:00": 7,
	"16:30:00": 8,
	"17:20:00": 8,
	"17:29:00": 8,
	"17:30:00": 9,
	"18:20:00": 9,
	"18:29:00": 9,
	"18:30:00": 10,
	"19:20:00": 10,
	"19:29:00": 10,
	"19:30:00": 11,
	"20:20:00": 11,
	"20:29:00": 11,
	"20:30:00": 11,
};

const nullDayPopulated = {
	hour_1_section: Model,
	hour_2_section: Model,
	hour_3_section: Model,
	hour_4_section: Model,
	hour_5_section: Model,
	hour_6_section: Model,
	hour_7_section: Model,
	hour_8_section: Model,
	hour_9_section: Model,
	hour_10_section: Model,
	hour_11_section: Model,
	hour_12_section: Model,
};


const idx_to_schema = [
	"hour_1_section",
	"hour_2_section",
	"hour_3_section",
	"hour_4_section",
	"hour_5_section",
	"hour_6_section",
	"hour_7_section",
	"hour_8_section",
	"hour_9_section",
	"hour_10_section",
	"hour_11_section",
	"hour_12_section",
];



interface CombinedCourse {
	course_code: string;
	same_lec: Model;
	same_tut: Model | null;
	same_lab: Model | null;
	combined_times: SchedulePopulated;
}

// CHECK (section_day IN ('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')),
// CHECK (section_type IN ('Lecture', 'Lab', 'Tutorial'))


const setTime = (combined_course: CombinedCourse, section: Model): void => {
	let from: string = section.getDataValue('section_from') as string;
	let to: string = section.getDataValue('section_to') as string;

	if (from.length < 7) from += ":00"
	if (to.length < 7) to += ":00"

	// if (from in Object.keys(hour_to_idx) == false) throw new Error();
	// if (to in Object.keys(hour_to_idx) == false) throw new Error();

	// @ts-ignore
	for (let i: number = hour_to_idx[from]; i <= hour_to_idx[to]; i++) {
		// /@ts-ignore
		// combined_course.combined_times[slot.section_day.toLowerCase()][idx_to_schema[i]] = slot;

		let day = section.getDataValue('section_day').toLowerCase();

		// @ts-ignore
		combined_course.combined_times[day][idx_to_schema[i]] = section;
	}
}

const releaseTime = (combined_course: CombinedCourse, section: Model): void => {
	let from: string = section.getDataValue('section_from') as string;
	let to: string = section.getDataValue('section_to') as string;

	if (from.length < 7) from += ":00"
	if (to.length < 7) to += ":00"

	// if (from in Object.keys(hour_to_idx) == false) throw new Error();
	// if (to in Object.keys(hour_to_idx) == false) throw new Error();

	// @ts-ignore
	for (let i: number = hour_to_idx[from]; i <= hour_to_idx[to]; i++) {
		// @ts-ignore
		// combined_course.combined_times[slot.section_day.toLowerCase()][idx_to_schema[i]] = null;
		let day = section.getDataValue('section_day').toLowerCase();

		// @ts-ignore
		combined_course.combined_times[day][idx_to_schema[i]] = null;
	}
};


const extractCombinedCourseData = async (course_code: string): Promise<CombinedCourse[]> => {
	const combined_courses: CombinedCourse[] = [];


	// get courses in course lecs
	const lecs = await Section.findAll({
		where: {
			course_code,
			section_type: "Lecture"
		}
	});

	// get courses in course tuts (if any)
	const tuts = await Section.findAll({
		where: {
			course_code,
			section_type: "Tutorial"
		}
	});

	// get courses in course labs (if any)
	const labs = await Section.findAll({
		where: {
			course_code,
			section_type: "Lab"
		}
	});

	for (let lec of lecs) {
		const combined_course: CombinedCourse = {
			course_code: lec.getDataValue('course_code'),
			same_lec: lec,
			same_tut: null,
			same_lab: null,
			combined_times: {
				saturday: JSON.parse(JSON.stringify(nullDayPopulated)),
				sunday: JSON.parse(JSON.stringify(nullDayPopulated)),
				monday: JSON.parse(JSON.stringify(nullDayPopulated)),
				tuesday: JSON.parse(JSON.stringify(nullDayPopulated)),
				wednesday: JSON.parse(JSON.stringify(nullDayPopulated)),
				thursday: JSON.parse(JSON.stringify(nullDayPopulated)),
				friday: JSON.parse(JSON.stringify(nullDayPopulated)),
			},
		};

		setTime(combined_course, lec);

		for (let tut of tuts) {
			if (!tut.getDataValue('section_name').startsWith(lec.getDataValue('section_name'))) continue;

			combined_course.same_tut = tut;
			setTime(combined_course, tut);

			for (let lab of labs) {
				if (!lab.getDataValue('section_name').startsWith(lec.getDataValue('section_name'))) continue;

				combined_course.same_lab = lab;
				setTime(combined_course, lab)

				combined_courses.push(JSON.parse(JSON.stringify(combined_course)));

				combined_course.same_lab = null;
				releaseTime(combined_course, lab)
			}

			if (labs.length == 0) combined_courses.push(JSON.parse(JSON.stringify(combined_course)));
			combined_course.same_tut = null;
			releaseTime(combined_course, tut)
		}

		if (tuts.length == 0) {
			for (let lab of labs) {
				if (!lab.getDataValue('section_name').startsWith(lec.getDataValue('section_name'))) continue;
				combined_course.same_lab = lab;
				setTime(combined_course, lab);

				combined_courses.push(JSON.parse(JSON.stringify(combined_course)));

				combined_course.same_lab = null;
				releaseTime(combined_course, lab)
			}
		}
		if (labs.length == 0) combined_courses.push(JSON.parse(JSON.stringify(combined_course)));
	}

	// console.log(combined_courses[0].combined_times, combined_courses.length)
	// console.log(lecs)
	// console.log(tuts)
	// console.log(labs)
	return combined_courses;
};

export { CombinedCourse, extractCombinedCourseData }


// extractCombinedCourseData("ECEN101");