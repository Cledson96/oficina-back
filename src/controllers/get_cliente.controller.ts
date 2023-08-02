import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function clienteId(req: Request, res: Response) {
  const id: number = Number(req.params.id);

  try {
    const cliente = await prisma.clients.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        address: true,
        phone: true,
        phonecontact: true,
        cpf: true,
        cep: true,
        email: true,
      },
    });

    if (!cliente) {
      res.status(404).send("Usuario não encontrado!");
      return;
    }

    res.status(200).send(cliente);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
}
