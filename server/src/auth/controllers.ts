import { NextFunction, Request, Response } from "express";
import { create } from "./services";

export async function signUp(request: Request, response: Response, next: NextFunction) {
  try {
    const data = request.body;
    const serviceResponse = await create(data);

    return response.send(serviceResponse).status(201);
  } catch(error) {
    next(error);
  }
}
