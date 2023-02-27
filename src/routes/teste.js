import { Router } from "express";

const router = Router();

router.post("/teste", (req, res) => {
  res.send("ok").status(200);
  return;
});

export default router;
