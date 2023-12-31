import Joi from "joi";

export const healthDataSchema: Joi.ObjectSchema = Joi.object({
  data: Joi.string().trim().min(3).max(100).required(),
});
