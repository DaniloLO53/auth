import { Router } from "express";
import { signUp } from "./controllers";
import { validate } from "./middlewares";
import { adminSignUp } from "./schemas";

const router = Router();

router.post('/admin/sign-up',
  validate(adminSignUp),
  signUp
);

export default router;