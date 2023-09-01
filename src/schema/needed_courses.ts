import Joi from "joi";


export default Joi.object({
    needed_courses: Joi.array().items(Joi.string()).required(),
}).required();