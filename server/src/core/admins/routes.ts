import { Router } from "express";
import { authenticate } from "../../auth/jwt";
import { signUp } from "./controllers";
import { validate } from "./middlewares";
import { adminSignUp } from "./schemas";

const router = Router();

router.post('/sign-up',
  // authenticate,
  validate(adminSignUp),
  signUp
);

export default router;