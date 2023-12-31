import { NextFunction, Request, Response } from "express";
import { create } from "./services";

export async function healthCreate(request: Request, response: Response, next: NextFunction) {
  try {
    const healthData = request.body;
    const serviceResponse = await create(healthData);

    return response.send(serviceResponse).status(201);
  } catch(error) {
    next(error);
  }
}

export async function healthGet(request: Request, response: Response, next: NextFunction) {
  try {
    return response.sendStatus(200);
  } catch(error) {
    next(error);
  }
}

export async function healthUpdate(request: Request, response: Response, next: NextFunction) {
  try {
    return response.sendStatus(201);
  } catch(error) {
    next(error);
  }
}

export async function healthDelete(request: Request, response: Response, next: NextFunction) {
  try {
    return response.sendStatus(201);
  } catch(error) {
    next(error);
  }
}