import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export async function handler(error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) {
  return response.send({ erro: "epa"}).status(400);
}
import { Router } from "express";

const router = Router();

router.use(
  handler(),
);

export default router;