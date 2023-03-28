import { signInSchema } from "@/models/signIn.models";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { connection } from "@/database/db";
import { v4 } from "uuid";

export async  function signIn(req: Request, res: Response){
    
const validation = signInSchema.validate(req.body, { abortEarly: false });


}