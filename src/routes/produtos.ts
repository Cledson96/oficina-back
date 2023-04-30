import { Router } from "express";
import { produto } from "../controllers/produto.controller";

const router = Router();

router.post("/produtos", produto);

export default router;
