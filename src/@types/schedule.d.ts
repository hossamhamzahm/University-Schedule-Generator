
interface ScheduleInterface {
    user_username: string;
    is_stared: boolean;
    is_archived: boolean;
    is_registered: boolean;

    schedule_id: number;

    saturday_id: number;
    sunday_id: number;
    monday_id: number;
    tuesday_id: number;
    wednesday_id: number;
    thursday_id: number;
    friday_id: number;
}



interface SchedulePopulated {
    user_username?: string;
    is_stared?: boolean;
    is_archived?: boolean;
    is_registered?: boolean;

    schedule_id?: number;

    saturday: nullDayPopulated;
    sunday: nullDayPopulated;
    monday: nullDayPopulated;
    tuesday: nullDayPopulated;
    wednesday: nullDayPopulated;
    thursday: nullDayPopulated;
    thursday: nullDayPopulated;
    friday: nullDayPopulated;
}

export {
    ScheduleInterface,
    SchedulePopulated
}