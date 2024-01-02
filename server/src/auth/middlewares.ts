import { NextFunction, Request, Response } from "express";
import schema from './schemas';

export function validate(req: Request, res: Response, next: NextFunction) {
  const validation = schema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    validation.error.details.map(({ message }) => {
      console.log(message);
    })
    next(validation.error)
  } else {
    next();
  }
}