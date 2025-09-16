import Joi from "joi";

const registerUserValidation = Joi.object({
    name: Joi.string().max(100).required(),
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    name: Joi.string().max(100).optional(),
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).optional()
});

const deleteUserValidation = Joi.number().integer().positive().required();

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation,
    deleteUserValidation
}
