import { Router } from "express";
import { clienteId } from "../controllers/get_cliente.controller";

const router = Router();

router.get("/cliente/:id", clienteId);

export default router;
