import { Router } from "express";
import { categoria } from "../controllers/get_categorias.controller";

const router = Router();

router.get("/categoria", categoria);

export default router;
