import { NextFunction, Request, Response } from "express";
import { customErrorBuilder, httpStatusCodes } from "../utils/errors";
import schema from './schemas';

export function validate(req: Request, res: Response, next: NextFunction) {
  const validation = schema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    validation.error.details.map(({ message }) => {
      console.log(message);
    });
    throw customErrorBuilder({
      message: 'Error on validation',
      statusCode: httpStatusCodes.UNPROCESSABLE_ENTITY,
      details: validation.error.details.map(({ message }) => message)
    });
  } else {
    next();
  }
}