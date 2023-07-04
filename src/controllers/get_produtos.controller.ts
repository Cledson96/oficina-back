import { connection } from "../database/db";
import { Request, Response } from "express";



export async function produto(req: Request, res: Response) {
    
    
    const sessions = await connection.query(`SELECT produtos.*, categoria.nome AS categoria FROM produtos INNER JOIN categoria ON produtos.categoria_id = categoria.id;`);
    res.send(sessions.rows)
    return

}