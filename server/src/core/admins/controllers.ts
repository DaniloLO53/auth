import { NextFunction, Request, Response } from "express";
import { createAdmin, loginAdmin } from "./services";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const user = req.body;

  try {
    const data = await createAdmin(user);
    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const credentials = req.body;

  try {
    const data = await loginAdmin(credentials);
    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
}