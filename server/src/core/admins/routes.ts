import { Router } from "express";
import { validate } from "../../middlewares/validateSchema";
import { signUp, signIn, refresh } from "./controllers";
import { adminSignUp, adminSignIn } from "./schemas";

const router = Router();

router.post('/refresh-token', refresh);
router.post('/sign-up', validate(adminSignUp), signUp);
router.post('/sign-in', validate(adminSignIn), signIn);

export default router;