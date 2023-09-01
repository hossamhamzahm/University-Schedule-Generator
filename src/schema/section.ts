import Joi from "joi";


export default Joi.object({
    section: Joi.object({
        course_code: Joi.string().required(),
        instructor_username: Joi.string().required(),
        section_name: Joi.string().required(),
        section_type: Joi.string().required(),
        section_day: Joi.string().required(),
        section_to: Joi.date().required(),
        section_from: Joi.date().required(),
    }).required(),
}).required();