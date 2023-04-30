import { connection } from "../database/db";
import { Request, Response } from "express";

export async function categoria(req: Request, res: Response) {
     const sessions = await connection.query('SELECT * FROM categoria;');
    res.send(sessions.rows)
    return

}