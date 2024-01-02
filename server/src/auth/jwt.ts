import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const jwtKey = process.env.JWT_CONFIRMATION_SECRET;

  next();
  console.log(jwtKey);
}