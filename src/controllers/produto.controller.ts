import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { produtoSchema } from "@/models/produtos.models";

export async function produto(req: Request, res: Response) {
  const requisicao: any = req.files;

  const foto = requisicao.foto[0].filename;
  const fotos = requisicao.fotos;
  
  const {
    nome,
    categoria,
    marca,
    qtd,
    vendidos,
    codigo,
    preco,
    promocao,
    descricao,
  } = req.body;

  const validation = produtoSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.message);
    return;
  }

  try {
    const produto = await prisma.produtos.create({
      data: {
        nome,
        categoria_id: categoria,
        marca,
        qtd,
        vendidos,
        codigo,
        preco,
        promocao,
        foto,
        descricao,
      },
      select: {
        id: true,
      },
    });

    const produtoId: number = produto.id;

    if (fotos) {
      for (let i = 0; i < fotos.length; i++) {
        await prisma.fotos.create({
          data: {
            id_produto: produtoId,
            caminho: fotos[i].filename,
          },
        });
      }
    }

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }

  return;
}
