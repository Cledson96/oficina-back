
import { Request, Response } from "express";

export async function webhook(req: Request, res: Response) {

    const data = req.body;
    console.log('Dados recebidos do webhook:', data);
    res.sendStatus(200);
}
