import Joi from "joi";


export default Joi.object({
    student: Joi.object({
        student_username: Joi.string().required(),
        f_name: Joi.string().required(),
        m_name: Joi.string().required(),
        l_name: Joi.string().required(),
        student_faculty: Joi.string().required(),
        student_password: Joi.string().required(),
    }).required(),
}).required();