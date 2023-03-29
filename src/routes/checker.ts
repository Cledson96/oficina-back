import { Router } from "express";
import { checker } from "../controllers/checker.controller";

const router = Router();

router.get("/checker", checker);

export default router;
