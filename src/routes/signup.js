import { Router } from "express";
import { signUp } from "../controllers/signup.controller.js";

const router = Router();

router.post("/sign_up", signUp);

export default router;
