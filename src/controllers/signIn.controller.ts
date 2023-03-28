import { signInSchema } from "@/models/signIn.models";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { connection } from "@/database/db";
import { v4 } from "uuid";
import {signInBody} from "./../interfaces/interface"

export async  function signIn(req: Request, res: Response){
    
const validation = signInSchema.validate(req.body, { abortEarly: false });

if (validation.error) {
    res.status(422).send("Digite corretamente seu login!");
    return
}
const { email, password }:signInBody  = req.body;
const token = v4(); 

try {
    const { rows } = await connection.query("SELECT * FROM clients WHERE email=$1;", [email]);

    if (rows.length === 0) {
        res.status(404).send("Usuario não cadastrado!");
        return
    }
    const verifypassword = bcrypt.compareSync(password, rows[0].password);
    if (!verifypassword) {
        return res.status(401).send("Email ou senha incorreto!");
    }
  
    const sessions = await connection.query('SELECT * FROM sessions WHERE "clientId"=$1;', [rows[0].id]);

    if (sessions.rows.length != 0) {
        res.locals.users = sessions;
        return res.send({ token: sessions.rows[0].token, name: sessions.rows[0].name });
    }

    await connection.query('INSERT INTO sessions ("clientId",name,token) VALUES ($1, $2, $3);', [rows[0].id, rows[0].name, token])
    res.send({ token, name: rows[0].name });

}catch (error) {
    res.status(500).send(error);
  }
}