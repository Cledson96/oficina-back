import { connection } from "@/database/db";
import { Router } from "express";

const router = Router();

router.get("/teste", async (req, res) => {
  
  return res.json("OK");
});

export default router;
