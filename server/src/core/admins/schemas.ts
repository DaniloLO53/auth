import Joi from 'joi';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export const adminSignUp = Joi.object({
  username: Joi
    .string()
    .alphanum()
    .min(4)
    .max(20)
    .required(),
  email: Joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  password: Joi
    .string()
    .pattern(new RegExp(passwordPattern))
    .required(),
  is_super: Joi
    .boolean()
    .required()
});