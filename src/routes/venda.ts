import { Router } from "express";
import { venda } from "../controllers/venda.controller";

const router = Router();

router.post("/venda", venda);

export default router;
