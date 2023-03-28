import { Router } from "express";
import { signUp } from "../controllers/signUp.controller";

const router = Router();

router.post("/sign_up", signUp);

export default router;
