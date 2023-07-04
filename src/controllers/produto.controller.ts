import { connection } from "../database/db";
import { Request, Response } from "express";

import { produtoSchema } from "@/models/produtos.models";

export async function produto(req: Request, res: Response) {
  let produtoId;
  const requisicao:any = req.files;


const foto= requisicao.foto[0].filename
const fotos= requisicao.fotos
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
        const result = await connection.query(
          "INSERT INTO produtos (nome,categoria_id,marca,qtd,vendidos,codigo,preco,promocao,foto,descricao) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10) RETURNING id;",
          [nome, categoria, marca, qtd, vendidos, codigo,preco,promocao,foto,descricao]
          
        );
      
        produtoId = result.rows[0].id;
          if(fotos){
            for(let i = 0;i < fotos.length;i++){
              await connection.query(
                "INSERT INTO fotos (id_produto,caminho) VALUES ($1, $2);",
                [produtoId, fotos[i].filename]
                
              )
            }
          }
      
        console.log(produtoId)
     res.sendStatus(201)
      
      } catch (error) {
        res.status(500).send(error);
      }

     
      return
    ;
  }