import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Cliente, produtoBody } from "./../interfaces/interface";
const prisma = new PrismaClient();

export async function webhook(req: Request, res: Response) {
  try {
    const referencia: string = req.body.data.id;

    res.sendStatus(200);

    const url = `https://api.mercadopago.com/v1/payments/${referencia}`;
    const token = process.env.ACESS_TOKEN;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        try {
          const compra = await prisma.pagamento.findFirst({
            where: {
              preferencia: response.data.external_reference,
            },
          });
          const data: Date = new Date(response.data.date_created) || new Date();
          const tipo_pagamento: string = response.data.payment_type_id || "";
          const parcelas: number = Number(response.data.installments) || 0;
          const total: number = Number(response.data.transaction_amount) || 0;
          const juros: number =
            Number(response.data.transaction_details.total_paid_amount || 0) -
            Number(total);

          if (compra && compra.compra !== null) {
            let compraObj: Cliente | any;

            if (typeof compra.compra === "string") {
              compraObj = JSON.parse(compra.compra);
            } else {
              compraObj = compra.compra;
            }

            const endereco_in = await prisma.enderecos.create({
              data: {
                logradouro: compraObj.info.endereco.logradouro || "",
                numero: compraObj.info.endereco.numero || "",
                complemento: compraObj.info.endereco.complemento || "",
                bairro: compraObj.info.endereco.bairro || "",
                cidade: compraObj.info.endereco.cidade || "",
                estado: compraObj.info.endereco.estado || "",
                cep: compraObj.info.endereco.cep || "",
                cliente_id: compraObj.cliente.id || "",
              },
            });

            const venda = await prisma.vendas.create({
              data: {
                valor_produto: Number(compraObj.info.valorProdutos) || 0,
                valor_frete: Number(compraObj.info.price) || 0,
                comprovante: referencia,
                data_venda: data,
                cliente_id: Number(compraObj.cliente.id) || 0,
                endereco_id: endereco_in.id,
                tipo_pagamento: tipo_pagamento,
                rastreio: null,
                status: "pendente",
                parcelas: parcelas,
                valor_total: total,
                juros: juros,
              },
            });
            const produtos = compraObj.info.produtos;

            const produtosVendidosData = produtos.map(
              (produto: produtoBody) => ({
                venda_id: venda.id,
                produto_id: Number(produto.id),
                marca: produto.marca || "",
                quantidade: Number(produto.quantidade),
                preco: Number(produto.preco),
                promocao: Number(produto.promocao),
                nome: produto.nome,
              })
            );

            await prisma.produtos_vendidos.createMany({
              data: produtosVendidosData,
            });

            for (const produto of produtos) {
              const produtoId = Number(produto.id);
              const quantidadeVendida = Number(produto.quantidade);

              const produtoAtual = await prisma.produtos.findUnique({
                where: { id: produtoId },
              });

              if (produtoAtual) {
                const novaQuantidade = produtoAtual.qtd - quantidadeVendida;

                await prisma.produtos.update({
                  where: { id: produtoId },
                  data: { qtd: novaQuantidade },
                });
              }
            }
            await prisma.pagamento.delete({
              where: {
                id: compra.id,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:");
        console.error(error);
      });
  } catch (error) {
    res.sendStatus(500);
  }
}
