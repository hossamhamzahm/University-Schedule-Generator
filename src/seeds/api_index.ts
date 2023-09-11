import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../config';
import Course from "../model/course"
import Section from "../model/section"
import User from "../model/user"
import Instructor from "../model/instructor"


interface IMap {
    [key: string]: any;
}


// sign_in url (username only)
const get_auth_mode_url = 'https://register.nu.edu.eg/PowerCampusSelfService/SignIn/GetAuthenticationMode';
const auth_url = 'https://register.nu.edu.eg/PowerCampusSelfService/SignIn/Authenticate'
const search_url = 'https://register.nu.edu.eg/PowerCampusSelfService/Sections';
const advanced_search_url = 'https://register.nu.edu.eg/PowerCampusSelfService/Sections/AdvancedSearch';


const headers: IMap = {
    "Content-Type": "application/json",
    'Origin': 'https://register.nu.edu.eg',
    'authority': 'register.nu.edu.eg',
    'scheme': 'https',
    'path': '/PowerCampusSelfService/Sections/AdvancedSearch',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'max-age=0',
    // 'Content-Length': '113',
    'Referer': 'https://register.nu.edu.eg/PowerCampusSelfService/Registration/Courses',
    'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': "Windows",
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
}
const user_credentials = { username: config.power_campus_username, password: config.power_campus_password };
const search_body = { keyWords: "course_name", yearTerm: "2023/SUMMER" };


const advanced_search_body = {
    "endDateKey": 0, "eventId": "", "keywords": "",
    "registrationtype": "TRAD", "startDateKey": 0,
    "period": "", "session": "02"
}



const AxiosInstance = axios.create(); // Create a new Axios Instance




function get_cookies(HTMLData: AxiosResponse) {
    if (HTMLData.headers['set-cookie'] && Array.isArray(HTMLData.headers['set-cookie'])) {
        if (headers['Cookie'] && Array.isArray(headers['Cookie'])) {
            headers['Cookie'] = headers['Cookie'].concat(HTMLData.headers['set-cookie'])
        }
        else headers['Cookie'] = (HTMLData.headers['set-cookie'] as [string]);
    }
}


async function send_request(url: string, body: IMap): Promise<AxiosResponse> {
    let HTMLData: AxiosResponse = await AxiosInstance.post(
        url,
        body,
        { headers, withCredentials: true }
    );

    get_cookies(HTMLData);
    // console.log(HTMLData.data)
    return HTMLData;
}


function get_instructors(api_course: IMap, section: IMap, users: Set<string>, instructors: Set<string>) {
    for (const api_instructor of api_course.instructors) {
        const instructor: IMap = {}
        const user: IMap = {}

        let full_name = api_instructor.fullName;
        if (!full_name) full_name = "Pending Instructor";

        if (full_name.split(' ').length < 3) {
            user.f_name = full_name.split(' ')[0];
            user.l_name = full_name.split(' ')[1];
            user.user_username = `${user.f_name}.${user.l_name}`
        }
        else {
            user.f_name = full_name.split(' ')[0];
            user.m_name = full_name.split(' ')[1];
            user.l_name = full_name.split(' ')[2];
            user.user_username = `${user.f_name}.${user.l_name}`
        }

        instructor.instructor_username = user.user_username;
        // instructor.faculty = user.user_username;
        section.instructor_username = user.user_username;

        users.add(JSON.stringify(user))
        instructors.add(JSON.stringify(instructor))
    }
}


function get_section_time(api_course: IMap, section: IMap) {
    for (const schedule of api_course.schedules) {
        // ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        section.section_day = schedule.dayDesc;

        // both are time of format  00:00:00
        section.section_to = (new Date("July 1, 1999, " + schedule.endTime)).toISOString().split('T')[1].split('.')[0];
        section.section_from = (new Date("July 1, 1999, " + schedule.startTime)).toISOString().split('T')[1].split('.')[0];
    }
}


async function get_data() {
    await send_request(get_auth_mode_url, user_credentials)
    await send_request(auth_url, user_credentials)

    const json_data = await send_request(advanced_search_url, advanced_search_body);
    const data = JSON.parse(json_data.data).data;

    // console.log(data)

    const users_string: Set<string> = new Set();
    const courses_string: Set<string> = new Set();
    const instructors_string: Set<string> = new Set();
    const sections: IMap[] = [];


    for (const api_course of data) {
        const course: IMap = {};
        const section: IMap = {};

        course.course_code = api_course.eventId;
        course.course_name = api_course.eventName;
        courses_string.add(JSON.stringify(course))

        section.course_code = api_course.eventId;
        section.section_name = api_course.section;
        // ['Lecture', 'Lab', 'Tutorial']
        section.section_type = api_course.eventSubType;

        if (!api_course.instructors) {
            api_course.instructors = [{ fullName: "Pending Instructor" }];
        }
        get_instructors(api_course, section, users_string, instructors_string)

        // if section has no time skip it
        if (!api_course.schedules) continue;

        get_section_time(api_course, section)

        sections.push(JSON.parse(JSON.stringify(section)))
    }

    const users = [...users_string].map(user => JSON.parse(user));
    const instructors = [...instructors_string].map(instructor => JSON.parse(instructor));
    const courses = [...courses_string].map(course => JSON.parse(course));

    await Course.bulkCreate(courses, { ignoreDuplicates: true })
    await User.bulkCreate(users, { ignoreDuplicates: true })
    await Instructor.bulkCreate(instructors, { ignoreDuplicates: true })
    await Section.bulkCreate(sections as [], { ignoreDuplicates: true })

    // console.log(sections)
    // console.log(courses.length)
    console.log("\nSeeding done successfully")
}

get_data()
