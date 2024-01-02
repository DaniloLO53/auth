import { Router } from "express";
import { signIn } from "./controllers";
import { validate } from "./middlewares";

const router = Router();

router.post('/admin/sign-in',
  validate,
  signIn
);

export default router;