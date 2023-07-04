import { Router } from "express";
import Frete from "../controllers/frete.controller";


const router = Router();

router.post("/frete", Frete);

export default router;
