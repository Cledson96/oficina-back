import { Request, Response, response } from "express";
import axios from "axios";
import { produtoBody , isValidProduct } from "../interfaces/interface";

export default async function Frete(req: Request, res: Response) {

  const cep: number = req.body.cep;
  const produtos: produtoBody[] = req.body.produtos;
  if (!cep || cep.toString().length !== 8) {
    res
      .status(400)
      .send("Cep invalido, obrigatório ser numérico no formato :99999999");
    return;
  }

  if (!Array.isArray(produtos) || !produtos.every(isValidProduct)) {
    res
      .status(400)
      .send("Produtos inválidos, verifique a estrutura e tipos dos objetos.");
    return;
  }

  const url = `${process.env.FRETE_DOMINIO}api/v2/me/shipment/calculate`;

  const headersConfig = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AUTHORIZATION}`,
    "User-Agent": "Aplicação (cledson1996@gmail.com)",
  };

  const listaProduto = produtos.map((referencia) => {
    return {
      id: referencia.id,
      width: referencia.largura,
      height: referencia.altura,
      length: referencia.profundidade,
      weight: referencia.peso,
      insurance_value: referencia.preco,
      quantity: referencia.quantidade,
    };
  });

  const requestBody = {
    from: {
      postal_code: process.env.CEP_ENVIO?.toString(),
    },
    to: {
      postal_code: cep.toString(),
    },
    products:listaProduto,
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: headersConfig,
    });
    res.status(200).send(response.data);
    return;
  } catch (error) {
    console.error("Erro na requisição:", error);
    res.status(500).send("Erro interno do servidor");
    return;
  }
}
