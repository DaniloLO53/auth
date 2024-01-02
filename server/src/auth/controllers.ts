import { NextFunction, Request, Response } from "express";

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    return res.status(201).send(body);
  } catch (err) {
    next(err);
  }
}