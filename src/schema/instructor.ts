import Joi from "joi";


export default Joi.object({
    instructor: Joi.object({
        instructor_username: Joi.string().required(),
        f_name: Joi.string().required(),
        m_name: Joi.string().required(),
        l_name: Joi.string().required(),
        instructor_faculty: Joi.string().required(),
    }).required(),
}).required();