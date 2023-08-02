import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function checker(req: Request, res: Response) {
  const { token } = req.headers;

  if (!token) {
    res.status(404).send("Obrigatório envio de um token valido!");
    return;
  }

  try {
    const session = await prisma.sessions.findFirst({
      where: {
        token: token as string,
      },
      select: {
        name: true,
        clientId: true,
      },
    });

    if (session) {
      res.status(200).send({ nome: session.name, id: session.clientId });
    } else {
      res.status(404).send("Token inválido");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
