import { NextFunction, Request, Response } from "express";
import { createAdmin, loginAdmin, generateAccessTokenByRefreshToken } from "./services";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const user = req.body;

  try {
    const data = await createAdmin(user);
    return res.status(201).send(data);
  } catch (err) {
    next(err);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const credentials = req.body;

  try {
    const { refreshToken, accessToken } = await loginAdmin(credentials);

    return res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict'
      })
      .header('Authorization', accessToken)
      .sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const refreshToken = req.cookies['refreshToken'];
  
  try {
    const accessToken = generateAccessTokenByRefreshToken(refreshToken);

    return res.header('Authorization', accessToken).sendStatus(201)
  } catch (err) {
    next(err);
  }
}