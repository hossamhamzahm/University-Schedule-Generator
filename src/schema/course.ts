import Joi from "joi";


export default Joi.object({
    course: Joi.object({
        course_code: Joi.string().required(),
        course_name: Joi.string().required()
    }).required(),
}).required();