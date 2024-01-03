import { Router } from "express";
import { checkRole } from "../../../middlewares/checkRole";

const router = Router();

router.get('/admins',
  checkRole('student'),
  (req: any, res: any, nxt: any) => {
    console.log(req.user)
    try {
      return res.sendStatus(201);
    } catch (err) {
      nxt(err);
    }
  });

export default router;