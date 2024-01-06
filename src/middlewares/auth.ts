import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { customErrorBuilder, httpStatusCodes } from '../utils/errors';
import jwt from 'jsonwebtoken';
import { DecodedAdmin } from '../core/admins/interfaces';

dotenv.config();

const bypassUrls = ['/admins/sign-in'];
const jwtAccessKey = process.env.JWT_ACCESS_SECRET;
const accessExpiresIn = parseInt(process.env.JWT_ACCESS_TIME);
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;

function authenticateByRefreshToken(
  refreshToken: string,
  res: Response,
  next: NextFunction
) {
  try {
    const decoded = jwt.verify(refreshToken, jwtRefreshKey) as DecodedAdmin;
    const accessToken = jwt.sign(
      { user: { ...decoded.user, is_admin: true } },
      jwtAccessKey,
      {
        expiresIn: accessExpiresIn,
      }
    );

    return res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
      })
      .header('Authorization', accessToken)
      .send({
        payload: { user: { ...decoded.user, is_admin: true } },
        accessToken,
        refreshToken,
      });
  } catch (err) {
    next(err);
  }
}

export function authenticate(
  req: Request & DecodedAdmin,
  res: Response,
  next: NextFunction
) {
  if (bypassUrls.includes(req.url)) {
    return next();
  }

  const accessToken = req.headers['authorization'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken || !refreshToken) {
    throw customErrorBuilder({
      message: 'Access denied. No token provided.',
      statusCode: httpStatusCodes.UNAUTHORIZED,
    });
  }

  try {
    const decoded = jwt.verify(accessToken, jwtAccessKey) as DecodedAdmin;
    req.user = decoded.user;
    next();
  } catch (err) {
    if (err.message === 'jwt expired') {
      return authenticateByRefreshToken(refreshToken, res, next);
    }
    next(err);
  }
}
