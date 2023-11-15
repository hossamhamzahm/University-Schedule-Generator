import ExtractCombinedSectionList from "./ExtractCombinedSectionList";
import { SchedulePopulated, nullDay } from "../../@types/ScheduleInterfaces";
import { clash, mark } from "./clash_or_mark";


let allPossibilities: SchedulePopulated[];
let possibility: SchedulePopulated;



async function generate(idx: number, course_list: string[]) {
    if (idx === course_list.length) {
        allPossibilities.push(JSON.parse(JSON.stringify(possibility)));
        return;
    }

    const combined_courses = await ExtractCombinedSectionList(course_list[idx]);

    for (let combined_course of combined_courses) {
        if (clash(combined_course, possibility)) continue;

        //Do
        mark(combined_course, possibility, true)

        //Recurse
        await generate(idx + 1, course_list);

        //Undo
        mark(combined_course, possibility, false)
    }
}



async function GenerateSchedules(course_list: string[]) {
    allPossibilities = [];
    possibility = {
        saturday: JSON.parse(JSON.stringify(nullDay)),
        sunday: JSON.parse(JSON.stringify(nullDay)),
        monday: JSON.parse(JSON.stringify(nullDay)),
        tuesday: JSON.parse(JSON.stringify(nullDay)),
        wednesday: JSON.parse(JSON.stringify(nullDay)),
        thursday: JSON.parse(JSON.stringify(nullDay)),
        friday: JSON.parse(JSON.stringify(nullDay)),
    }

    await generate(0, course_list);
    return allPossibilities;
}


// GenerateSchedules(["ECEN430"])

export default GenerateSchedules;