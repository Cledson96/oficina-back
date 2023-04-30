import { connection } from "../database/db";
import { Request, Response } from "express";
import {produtoBody} from "../interfaces/interface"
import { produtoSchema } from "@/models/produtos.models";


export async function produto(req: Request, res: Response) {
    const {
        nome,
        categoria,
        marca,
        qtd,
        vendidos,
        codigo,
        preco,
        promocao,
        foto,
        descricao
      }:produtoBody = req.body;
    
      const validation = produtoSchema.validate(req.body, { abortEarly: false });
      if (validation.error) {
        res.status(422).send(validation.error.message);
        return;
      }
      
      try {
        await connection.query(
          "INSERT INTO produtos (nome,categoria_id,marca,qtd,vendidos,codigo,preco,promocao,foto,descricao) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10);",
          [nome, categoria, marca, qtd, vendidos, codigo,preco,promocao,foto,descricao]
        );
        res.sendStatus(201);
      } catch (error) {
        res.status(500).send(error);
      }

}