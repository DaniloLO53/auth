import { Router } from "express";
import { checkRole } from "../../middlewares/checkRole";
import { validate } from "../../middlewares/validateSchema";
import { signUp, signIn, refresh } from "./controllers";
import { adminSignUp, adminSignIn } from "./schemas";

const router = Router();

router.post('/refresh-token', refresh);
router.post('/sign-up', checkRole('superAdmin'), validate(adminSignUp), signUp);
router.post('/sign-in', validate(adminSignIn), signIn);

export default router;