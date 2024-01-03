import { Admin } from "../core/admins/interfaces";
import jwt from 'jsonwebtoken';

export function generateJwt(admin: Omit<Admin, 'password'>) {
  const jwtKey = process.env.JWT_CONFIRMATION_SECRET;
  const expiresIn = process.env.JWT_CONFIRMATION_TIME;
  
  const token = jwt.sign(admin, jwtKey, { expiresIn });

  return token;
}
