import {Section, SectionStore} from "../section";
import { nullDayPopulated } from "../day";
import { SchedulePopulated } from "../schedule";



const hour_to_idx = {
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
    same_lec: Section;
	same_tut: Section | null;
	same_lab: Section | null;
	combined_times: SchedulePopulated;
}

// CHECK (section_day IN ('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday')),
// CHECK (section_type IN ('Lecture', 'Lab', 'Tutorial'))


const setTime = (combined_course: CombinedCourse, slot: Section): void => {
	// @ts-ignore
	for (let i = hour_to_idx[slot.section_from]; i <= hour_to_idx[slot.section_to]; i++) {
		// @ts-ignore
		combined_course.combined_times[slot.section_day.toLowerCase()][idx_to_schema[i]] = slot;
	}
}

const releaseTime = (combined_course: CombinedCourse, slot: Section): void => {
	// @ts-ignore
	for (let i = hour_to_idx[slot.section_from]; i <= hour_to_idx[slot.section_to]; i++) {
		// @ts-ignore
		combined_course.combined_times[slot.section_day.toLowerCase()][idx_to_schema[i]] = null;
	}
};


const extractCombinedCourseData = async (course_code: string): Promise<CombinedCourse[]> => {
	const sectionStore = new SectionStore();
    const combined_courses: CombinedCourse[] = [];


	// get courses in course lecs
	const lecs: Section[] = await sectionStore.showAllCourseSections(course_code, "Lecture");

	// get courses in course tuts (if any)
	const tuts: Section[] = await sectionStore.showAllCourseSections(course_code, "Tutorial");

	// get courses in course labs (if any)
	const labs: Section[] = await sectionStore.showAllCourseSections(course_code, "Lab");

	for (let lec of lecs) {
		const combined_course: CombinedCourse = {
			course_code: lec.course_code,
			same_lec: lec,
			same_tut: null,
			same_lab: null,
			combined_times: {
				sunday: JSON.parse(JSON.stringify(nullDayPopulated)),
				monday: JSON.parse(JSON.stringify(nullDayPopulated)),
				tuesday: JSON.parse(JSON.stringify(nullDayPopulated)),
				wednesday: JSON.parse(JSON.stringify(nullDayPopulated)),
				thursday: JSON.parse(JSON.stringify(nullDayPopulated)),
			},
		};
        
        setTime(combined_course, lec);
        
		for (let tut of tuts) {
			if (!tut.section_name.startsWith(lec.section_name)) continue;

			combined_course.same_tut = tut;
            setTime(combined_course, tut);

			for (let lab of labs) {
				if (!lab.section_name.startsWith(lec.section_name)) continue;

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
				if (!lab.section_name.startsWith(lec.section_name)) continue;
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
	return combined_courses;
};

export {CombinedCourse, extractCombinedCourseData}


// extractCombinedCourseData("ECEN101");