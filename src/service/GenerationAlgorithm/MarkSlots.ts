import { Model } from "sequelize";
import { NullDay, SchedulePopulated, hour_to_key } from "../../@types/ScheduleInterfaces";


function MarkSlots(schedule: SchedulePopulated, lec: Model<any, any>, reserve: boolean) {
    type hour_key = keyof (typeof hour_to_key);
    type day_type = keyof SchedulePopulated;

    const day: day_type = (lec.getDataValue("section_day") as string).toLowerCase() as day_type;
    const from_str: hour_key = lec.getDataValue("section_from") as hour_key;
    const to_str: hour_key = lec.getDataValue("section_to") as hour_key;

    const from = (new Date("1970-01-01T" + from_str))
    const to = new Date("1970-01-01T" + to_str);

    for (let k of Object.keys(hour_to_key)) {
        let target = new Date("1970-01-01T" + (k[0] == '8' || k[0] == '9' ? '0' + k : k));

        if (target < from) continue;
        if (target > to) break;

        const slot = hour_to_key[k as hour_key] as keyof NullDay
        schedule[day][slot] = (reserve ? lec : null);
    }

}

export default MarkSlots;