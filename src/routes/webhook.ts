import { Router } from "express";
import { webhook } from "../controllers/webhook.controller";

const router = Router();

router.post("/webhook", webhook);

export default router;
