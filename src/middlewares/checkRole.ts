import { NextFunction, Request, Response } from 'express';
import { DecodedAdmin } from '../core/admins/interfaces';
import { customErrorBuilder, httpStatusCodes } from '../utils/errors';

type Role = 'admin' | 'superAdmin' | 'student' | 'teacher';

export function checkRole(role: Role) {
  return function (
    req: Request & DecodedAdmin,
    _: Response,
    next: NextFunction
  ) {
    let pass: boolean;

    switch (role) {
      case 'admin':
        pass = req.user.is_admin === true;
        break;
      case 'superAdmin':
        pass = req.user.is_super === true;
        break;
      default:
        pass = false;
    }

    if (pass === false) {
      throw customErrorBuilder({
        message: 'Forbidden',
        statusCode: httpStatusCodes.FORBIDDEN,
      });
    }

    next();
  };
}
