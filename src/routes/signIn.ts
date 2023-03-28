import { Router } from "express";
import { signIn } from "../controllers/signIn.controller";

const router = Router();

router.post("/sign_in", signIn);

export default router;
