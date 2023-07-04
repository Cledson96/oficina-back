import { Router } from "express";
import { ranking } from "../controllers/ranking.controller";

const router = Router();

router.get("/ranking", ranking);

export default router;
