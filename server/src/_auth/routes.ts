import { Router } from "express";
import { validateBody } from "../core/utils/validateMiddleware";
import { signUp } from "./controllers";
import { signUpSchema } from "./schemas";

const router = Router();

router.post(
  '/sign-up',
  validateBody(signUpSchema),
  signUp
);

export default router;