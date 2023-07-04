import joi from "joi";
import {produtoBody} from "./../interfaces/interface"

  export const produtoSchema = joi.object({
    nome: joi.string().required().min(2).max(50),
    categoria: joi.number().required(),
    marca: joi.string().required(),
    vendidos: joi.number(),
    qtd: joi.number().required(),
    codigo: joi.string(),
    preco: joi.string().required(),
    promocao: joi.string(),
  
    descricao: joi.string().required(),
  });
