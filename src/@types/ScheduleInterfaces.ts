import { Model } from "sequelize";


interface NullDay {
    hour_1_section: Model | null;
    hour_2_section: Model | null;
    hour_3_section: Model | null;
    hour_4_section: Model | null;
    hour_5_section: Model | null;
    hour_6_section: Model | null;
    hour_7_section: Model | null;
    hour_8_section: Model | null;
    hour_9_section: Model | null;
    hour_10_section: Model | null;
    hour_11_section: Model | null;
    hour_12_section: Model | null;
}



const nullDay: NullDay = {
    hour_1_section: null,
    hour_2_section: null,
    hour_3_section: null,
    hour_4_section: null,
    hour_5_section: null,
    hour_6_section: null,
    hour_7_section: null,
    hour_8_section: null,
    hour_9_section: null,
    hour_10_section: null,
    hour_11_section: null,
    hour_12_section: null
}


interface SchedulePopulated {
    // user_username?: string;
    // is_stared?: boolean;
    // is_archived?: boolean;
    // is_registered?: boolean;

    // schedule_id?: number;

    saturday: NullDay;
    sunday: NullDay;
    monday: NullDay;
    tuesday: NullDay;
    wednesday: NullDay;
    thursday: NullDay;
    friday: NullDay;

    // [Symbol.iterator]():{

    // }
}

interface SectionInterface {
    section_id?: string;
    course_code: string;
    course_name?: string;
    section_name: string;
    section_type: string;
    section_day: string;
    section_from: string;
    section_to: string;
    instructor_name?: string;
    instructor_username?: string;
}


interface CombinedCourse {
    course_code: string;
    same_lec: Model | null;
    same_tut: Model | null;
    same_lab: Model | null;
    combined_times: SchedulePopulated;
}



const hour_to_key = {
    "8:30": "hour_1_section",
    
    "9:30": "hour_2_section",
    
    "10:30": "hour_3_section",
    
    "11:30": "hour_4_section",
    
    "12:30": "hour_5_section",
    
    "13:30": "hour_6_section",
    
    "14:30": "hour_7_section",
    
    "15:30": "hour_8_section",
    
    "16:30": "hour_9_section",
    
    "17:30": "hour_10_section",
    
    "18:30": "hour_11_section",
    
    "19:30": "hour_12_section",
    
};





export {
    CombinedCourse,
    SectionInterface,
    SchedulePopulated,
    NullDay,
    nullDay,
    hour_to_key
}