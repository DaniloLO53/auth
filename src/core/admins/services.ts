import { comparePasswords } from '../../utils/comparePasswords';
import { customErrorBuilder, httpStatusCodes } from '../../utils/errors';
import { generateJwt } from '../../utils/generateJwt';
import { Admin, Credentials, DecodedAdmin } from './interfaces';
import { getAdminByEmail } from './repositories';
import jwt from 'jsonwebtoken';

export async function createAdmin(user: Admin) {
  const {
    rows: [admin],
    rowCount,
  } = await getAdminByEmail(user.email);

  if (rowCount === 0) {
    throw customErrorBuilder({
      message: 'Incorrect credentials',
      statusCode: httpStatusCodes.UNAUTHORIZED,
    });
  }
  return user;
}

export function generateAccessTokenByRefreshToken(token: string) {
  if (!token) {
    throw customErrorBuilder({
      message: 'Access Denied. No refresh token provided.',
      statusCode: httpStatusCodes.UNAUTHORIZED,
    });
  }

  const jwtAccessKey = process.env.JWT_ACCESS_SECRET;
  const accessExpiresIn = process.env.JWT_ACCESS_TIME;
  const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;

  const decoded = jwt.verify(token, jwtRefreshKey) as DecodedAdmin;
  const accessToken = jwt.sign(
    { user: { ...decoded.user, is_admin: true } },
    jwtAccessKey,
    { expiresIn: accessExpiresIn }
  );

  return accessToken;
}

export async function loginAdmin(credentials: Credentials) {
  const { email, password } = credentials;
  const {
    rows: [admin],
    rowCount,
  } = await getAdminByEmail(email);

  if (rowCount === 0) {
    throw customErrorBuilder({
      message: 'Incorrect credentials',
      statusCode: httpStatusCodes.UNAUTHORIZED,
    });
  }

  const { password: storedPassword, ...sanitizedAdmin } = admin;
  const passwordValidation = await comparePasswords(password, storedPassword);

  if (!passwordValidation) {
    throw customErrorBuilder({
      message: 'Incorrect credentials',
      statusCode: httpStatusCodes.UNAUTHORIZED,
    });
  }

  return generateJwt(sanitizedAdmin);
}
