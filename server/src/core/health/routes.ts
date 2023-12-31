import { Router } from "express";
import { healthCreate } from "./controllers";
import { validateBody } from "./middlewares";
import { healthDataSchema } from "./schemas";

const router = Router();

router.post('/health', validateBody(healthDataSchema), healthCreate);

export default router;