import { connection } from "../database/db";
import { Request, Response } from "express";



export async function ranking(req: Request, res: Response) {
    
    
    const sessions = await connection.query(`SELECT* FROM produtos ORDER BY vendidos DESC LIMIT 5 ;`);
    res.send(sessions.rows)
    return

}