import { Model, Op } from "sequelize";
import Section from "../../model/section";
import { CombinedCourse, NullDay, nullDay, SchedulePopulated } from "../../@types/ScheduleInterfaces";
import MarkSlots from "./MarkSlots";
import Course from "../../model/course";





const ExtractCombinedSectionList = async (course_code: string): Promise<CombinedCourse[]> => {
    const combined_courses: CombinedCourse[] = [];


    // skip if grad course
    const course = await Course.findOne({
        where: {
            [Op.and]: [
                {course_code: {
                    [Op.like]: `%${course_code}%`
                }},
                {[Op.or]: [
                    {course_name: {
                        [Op.like]: `%${"graduation"}%`
                    }},
                    {course_name: {
                        [Op.like]: `%${"Senior Project"}%`
                    }},
                ]}
            ] 
        }
    });


    if (course) return [{
        course_code: course.getDataValue('course_code'),
        same_lec: course,
        same_tut: null,
        same_lab: null,
        combined_times: {
            saturday: JSON.parse(JSON.stringify(nullDay)),
            sunday: JSON.parse(JSON.stringify(nullDay)),
            monday: JSON.parse(JSON.stringify(nullDay)),
            tuesday: JSON.parse(JSON.stringify(nullDay)),
            wednesday: JSON.parse(JSON.stringify(nullDay)),
            thursday: JSON.parse(JSON.stringify(nullDay)),
            friday: JSON.parse(JSON.stringify(nullDay)),
        },
    }];



    // get courses in course lecs
    const lecs = await Section.findAll({
        where: {
            course_code: {
                [Op.like]: `%${course_code}%`
            },
            section_type: "Lecture"
        }
    });

    // get courses in course tuts (if any)
    const tuts = await Section.findAll({
        where: {
            course_code: {
                [Op.like]: `%${course_code}%`
            },
            section_type: "Tutorial"
        }
    });

    // get courses in course labs (if any)
    const labs = await Section.findAll({
        where: {
            course_code: {
                [Op.like]: `%${course_code}%`
            },
            section_type: "Lab"
        }
    });

    // console.log(combined_courses)
    // console.log(combined_courses[0].combined_times)
    // console.log(tuts[1])

    for (let lec of lecs) {
        const combined_course: CombinedCourse = {
            course_code: lec.getDataValue('course_code'),
            same_lec: lec,
            same_tut: null,
            same_lab: null,
            combined_times: {
                saturday: JSON.parse(JSON.stringify(nullDay)),
                sunday: JSON.parse(JSON.stringify(nullDay)),
                monday: JSON.parse(JSON.stringify(nullDay)),
                tuesday: JSON.parse(JSON.stringify(nullDay)),
                wednesday: JSON.parse(JSON.stringify(nullDay)),
                thursday: JSON.parse(JSON.stringify(nullDay)),
                friday: JSON.parse(JSON.stringify(nullDay)),
            },
        };

        MarkSlots(combined_course.combined_times, lec, true);
        // console.dir(combined_course.combined_times)


        for (let tut of tuts) {
            if (!tut.getDataValue('section_name').startsWith(lec.getDataValue('section_name'))) continue;

            combined_course.same_tut = tut;
            MarkSlots(combined_course.combined_times, tut, true);
            // console.dir(combined_course.combined_times)

            for (let lab of labs) {
                if (!lab.getDataValue('section_name').startsWith(lec.getDataValue('section_name'))) continue;

                combined_course.same_lab = lab;
                MarkSlots(combined_course.combined_times, lab, true)

                combined_courses.push(JSON.parse(JSON.stringify(combined_course)));

                combined_course.same_lab = null;
                MarkSlots(combined_course.combined_times, lab, false)
            }

            if (labs.length == 0) combined_courses.push(JSON.parse(JSON.stringify(combined_course)));

            combined_course.same_tut = null;
            MarkSlots(combined_course.combined_times, tut, false)
        }

        if (tuts.length == 0) {
            for (let lab of labs) {
                if (!lab.getDataValue('section_name').startsWith(lec.getDataValue('section_name'))) continue;
                combined_course.same_lab = lab;
                MarkSlots(combined_course.combined_times, lab, true);

                combined_courses.push(JSON.parse(JSON.stringify(combined_course)));

                combined_course.same_lab = null;
                MarkSlots(combined_course.combined_times, lab, false)
            }
            if (labs.length == 0) combined_courses.push(JSON.parse(JSON.stringify(combined_course)));
        }
    }

    // console.log(combined_courses[0])
    return combined_courses;
};



export default ExtractCombinedSectionList;
// ExtractCombinedSectionList("ECEN430");
