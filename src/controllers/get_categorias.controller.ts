import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function categoria(req: Request, res: Response) {
  try {
    const categorias = await prisma.categoria.findMany();
    res.send(categorias);
  } catch (error) {
    res.status(500).send("Erro interno do servidor");
  }
}
