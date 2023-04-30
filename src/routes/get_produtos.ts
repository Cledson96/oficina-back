import { Router } from "express";
import { produto } from "../controllers/get_produtos.controller";

const router = Router();

router.get("/produtos", produto);

export default router;
