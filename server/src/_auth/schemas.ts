import Joi from "joi";

export const signUpSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().trim().min(3).max(15).required(),
  email: Joi.string().trim().email().required(),
  password1: Joi.string().min(8).max(32).required(),
  password2: Joi.string().min(8).max(32).required(),
});
