import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function venda(req: Request, res: Response) {
  const { comprovante } = req.body;
  try {
    const vendas = await prisma.vendas.findMany({
      where: {
        comprovante: comprovante,
      },
      include: {
        produtos_vendidos: {
          include: {
            produto: true,
          },
        },
        endereco: true,
        cliente: true,
      },
    });

    res.send(vendas).status(200);
    return;
  } catch (error) {
    res.status(500).send("Erro interno do servidor");
    return;
  }
}
