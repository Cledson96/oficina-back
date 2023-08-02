import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function ranking(req: Request, res: Response) {
  try {
    const produtos = await prisma.produtos.findMany({
      orderBy: {
        vendidos: "desc",
      },
      take: 5,
    });

    res.status(200).send(produtos);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
}
