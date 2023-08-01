import { Router } from "express";
import { pagamento } from "../controllers/pagamento.controller";

const router = Router();

router.post("/preferencia", pagamento);

export default router;
