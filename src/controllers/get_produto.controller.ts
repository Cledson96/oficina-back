import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function produtoid(req: Request, res: Response): Promise<void> {
  const id: number = Number(req.params.id);

  try {
    const produto = await prisma.produtos.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        fotos: {
          select: {
            caminho: true,
          },
        },
      },
    });

    if (!produto) {
      res.status(404).send("Produto não encontrado!");
      return;
    }

    res.status(200).send(produto);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
}
