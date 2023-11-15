import { CombinedCourse, NullDay, SchedulePopulated, hour_to_key, nullDay } from "../../@types/ScheduleInterfaces";


function mark(combined_course: CombinedCourse, schedule: SchedulePopulated, mark: boolean) {
    type hour_key = keyof (typeof hour_to_key);
    type day_type = keyof SchedulePopulated;

    for (let day of Object.keys(combined_course.combined_times)) {
        for (let hour of Object.keys(combined_course.combined_times[day as day_type])) {
            if (combined_course.combined_times[day as day_type][hour as keyof NullDay] === null) continue;

            if (mark)
                schedule[day as day_type][hour as keyof NullDay] = combined_course.combined_times[day as day_type][hour as keyof NullDay];
            else schedule[day as day_type][hour as keyof NullDay] = null;
        }
    }

    return false;
}


function clash(combined_course: CombinedCourse, schedule: SchedulePopulated) {
    type hour_key = keyof (typeof hour_to_key);
    type day_type = keyof SchedulePopulated;

    for (let day of Object.keys(combined_course.combined_times)) {
        for (let hour of Object.keys(combined_course.combined_times[day as day_type])) {
            if (combined_course.combined_times[day as day_type][hour as keyof NullDay] == null) continue;
            if (schedule[day as day_type][hour as keyof NullDay] !== null) return true;

        }
    }

    return false;
}



export {
    clash,
    mark
};