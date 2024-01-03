import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode: number;
  details?: string[];
}

interface CustomErrorDto {
  message: string;
  statusCode: number;
  details?: string[];
}

export const httpStatusCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
};

export function customErrorBuilder(customErrorDto: CustomErrorDto) {
  const { message, statusCode, details } = customErrorDto;

  const err = new Error(message) as CustomError;
  err.statusCode = statusCode;
  err.details = details;

  return err;
}

export function errorController(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!error) {
    next();
  } else {
    const { message, details, statusCode } = error;
    return res.status(statusCode || 500).send({
      message,
      details,
    });
  }
}
