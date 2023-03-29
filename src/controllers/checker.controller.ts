import { connection } from "@/database/db";
import { Request, Response } from "express";


export async function checker(req: Request, res: Response) {
    const { token } = req.headers;

    if (!token) {
        res.status(404).send("Obrigatório envio de um token valido!");
        return
      }

try{
    const { rows } = await connection.query('SELECT * FROM sessions WHERE token =$1;',[token])
    if(rows.length>0){
        res.status(200).send(rows[0].name);
        return
    }
    res.status(404).send("token invalido")
    return
}catch (error) {
    res.status(500).send(error);
    return
  }
}