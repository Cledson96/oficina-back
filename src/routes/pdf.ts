import { Router } from "express";
import { pdf } from "../controllers/pdf.controller";

const router = Router();

router.post("/pdf", pdf);

export default router;
