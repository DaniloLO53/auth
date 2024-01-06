import { Admin } from '../core/admins/interfaces';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtAccessKey = process.env.JWT_ACCESS_SECRET;
const accessExpiresIn = parseInt(process.env.JWT_ACCESS_TIME);
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;
const refreshExpiresIn = parseInt(process.env.JWT_REFRESH_TIME);

export function generateJwt(payload: Omit<Admin, 'password'>) {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  }
}

export function generateAccessToken(admin: Omit<Admin, 'password'>) {
  return jwt.sign({ user: { ...admin, is_admin: true } }, jwtAccessKey, { expiresIn: accessExpiresIn });
}

export function generateRefreshToken(admin: Omit<Admin, 'password'>) {
  console.log({jwtRefreshKey})
  return jwt.sign({ user: { ...admin, is_admin: true } }, jwtRefreshKey, { expiresIn: refreshExpiresIn });
}