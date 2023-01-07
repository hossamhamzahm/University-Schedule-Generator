import { DayPopulated, nullDayPopulated } from "../day";
import { SchedulePopulated } from "../schedule";
import {CombinedCourse, extractCombinedCourseData} from "./extract_combined_course_data";




const possibility: SchedulePopulated =  {
    sunday: JSON.parse(JSON.stringify(nullDayPopulated)),
    monday: JSON.parse(JSON.stringify(nullDayPopulated)),
    tuesday: JSON.parse(JSON.stringify(nullDayPopulated)),
    wednesday: JSON.parse(JSON.stringify(nullDayPopulated)),
    thursday: JSON.parse(JSON.stringify(nullDayPopulated)),
}



const clash = (days: SchedulePopulated): boolean => {
    for(const day in possibility){
		// @ts-ignore
		for (const hour in days[day]) {
            // @ts-ignore
			if (days[day][hour] == null) continue;

			// @ts-ignore
			if (possibility[day][hour] != null) return true;
		}
	}
	return false;
};



const mark = (days: SchedulePopulated, rm: boolean): void => {
	for (const day in days) {

		// @ts-ignore
		for (const hour in days[day]) {
			// @ts-ignore
			if (days[day][hour] == null) continue;

			// @ts-ignore
			if (rm) possibility[day][hour] = null;
            // @ts-ignore
			else possibility[day][hour] = JSON.parse(JSON.stringify(days[day][hour]));
		}
	}
    
	return ;
};




const getCombinedCourses = async (needed_courses: string[], courses: CombinedCourse[][]): Promise<void> => {
	// at this point we got all the courses we need
	for (const needed_course of needed_courses) {
		courses.push(await extractCombinedCourseData(needed_course));
	}
};



// write backtracking here
const generate_schedules = async (coursesList: CombinedCourse[][], idx: number, allPossibilities: SchedulePopulated[]): Promise<void> => {
	// base case
	if (idx >= coursesList.length) {
		allPossibilities.push(JSON.parse(JSON.stringify(possibility)));
		return;
	}

    for(const course of coursesList[idx]){
		if (clash(course.combined_times)) continue;

        // DO : mark the schedule
		mark(course.combined_times, false)
		// recurse
		generate_schedules(coursesList, idx + 1, allPossibilities);
		// undo: unmark the schedule
		mark(course.combined_times, true);
	}
};


// const needed_courses: string[] = ["ECEN313", "ECEN311"];
async function generate_tables(needed_courses: string[]){
    const courses: CombinedCourse[][] = [];
	await getCombinedCourses(needed_courses, courses);
    const allPossibilities: SchedulePopulated[] = [];

	await generate_schedules(courses, 0, allPossibilities);
    return allPossibilities;
}
export default generate_tables;