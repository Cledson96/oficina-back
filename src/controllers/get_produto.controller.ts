import { connection } from "../database/db";
import { Request, Response } from "express";



export async function produtoid(req: Request, res: Response) {
   const id= req.params.id
 
    const sessions = await connection.query(`SELECT  p.*,  json_agg(f.caminho) AS fotos FROM produtos p LEFT JOIN fotos f ON p.id = f.id_produto WHERE p.id = ${id} GROUP BY p.id;`);
    res.send(sessions.rows)
    return

}