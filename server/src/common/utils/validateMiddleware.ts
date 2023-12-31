import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "params");
}

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "body");
}

function validate(schema: ObjectSchema, type: ValidationTypes) {
  return (request: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(request[type], {
      abortEarly: false,
    });

    console.log("Error: ", error);

    if (error) {
      next(error);
    } else {
      next();
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;
type ValidationTypes = "body" | "params";
