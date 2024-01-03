import { Admin } from "../core/admins/interfaces";
import jwt from 'jsonwebtoken';

export function generateJwt(admin: Omit<Admin, 'password'>) {
  const jwtAccessKey = process.env.JWT_ACCESS_SECRET;
  const accessExpiresIn = process.env.JWT_ACCESS_TIME;
  const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;
  const refreshExpiresIn = process.env.JWT_REFRESH_TIME;
  
  const accessToken = jwt.sign({ admin }, jwtAccessKey, { expiresIn: accessExpiresIn });
  const refreshToken = jwt.sign({ admin }, jwtRefreshKey, { expiresIn: refreshExpiresIn });

  return { accessToken, refreshToken };
}
