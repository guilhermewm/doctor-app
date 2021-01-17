import Joi from "@hapi/joi";

export const registerValidator = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
});

export const loginValidator = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
});

export const validateInfo = (rules: any, data: any) => {
    return rules.validate(data);
}