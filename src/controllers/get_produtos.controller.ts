import { Request, Response } from "express";
import { PrismaClient, produtos } from "@prisma/client";
const prisma = new PrismaClient();

export async function produto(req: Request, res: Response) {
  try {
    const produtos: produtos[] = await prisma.produtos.findMany({
      include: {
        categoria: {
          select: {
            nome: true,
          },
        },
      },
    });

    res.status(200).send(produtos);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
}
