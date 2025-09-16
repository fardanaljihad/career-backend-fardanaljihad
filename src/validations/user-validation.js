import Joi from "joi";

const registerUserValidation = Joi.object({
    name: Joi.string().max(100).required(),
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

export {
    registerUserValidation,
    loginUserValidation
}
