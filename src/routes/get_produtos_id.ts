import { Router } from "express";
import { produtoid } from "../controllers/get_produto.controller";

const router = Router();

router.get("/produto/:id", produtoid);

export default router;
