import { NextFunction, Request, Response } from 'express';
import { customErrorBuilder, httpStatusCodes } from '../utils/errors';
import Joi from 'joi';

export function validate(schema: Joi.ObjectSchema) {
  return function (req: Request, _: Response, next: NextFunction) {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      validation.error.details.map(({ message }) => {
        console.log(message);
      });
      throw customErrorBuilder({
        message: 'Error on validation',
        statusCode: httpStatusCodes.UNPROCESSABLE_ENTITY,
        details: validation.error.details.map(({ message }) => message),
      });
    } else {
      next();
    }
  };
}
