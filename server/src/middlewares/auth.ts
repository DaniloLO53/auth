import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const bypassUrls = [
  '/admins/sign-in'
];

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const jwtKey = process.env.JWT_CONFIRMATION_SECRET;

  if (bypassUrls.includes(req.url)) {
    next();
  } else {
    console.log(req.url);
    next();
  }
}