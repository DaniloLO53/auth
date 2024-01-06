import { Router } from "express";

const router = Router();

router.post('/admins',
  (req: any, res: any, nxt: any) => {
    try {
      return res.sendStatus(201);
    } catch (err) {
      nxt(err);
    }
  });

export default router;