import { Request, Response } from "express";
import mercadopago from "mercadopago";
import { Cliente, Envio } from "./../interfaces/interface";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
const prisma = new PrismaClient();

const accessToken: string = process.env.ACESS_TOKEN || "";

mercadopago.configure({
  access_token: accessToken,
});

export async function pagamento(req: Request, res: Response): Promise<void> {
  try {
    const preference: Envio = req.body.envio;
    const cliente: Cliente = req.body.cliente;
    const token = v4();
    
    preference.external_reference = token;

    const response = await mercadopago.preferences.create(preference);

    const pagamento = await prisma.pagamento.create({
      data: {
        user_id: cliente.cliente.id,
        preferencia: token,
        compra: JSON.stringify(cliente),
      },
    });
   
    res.status(200).send(response.body.id);
  } catch (error) {
    res.status(500).send({ error });
  }
}
