import { calcularPrecoPrazo, consultarCep } from "correios-brasil";
import { Request, Response } from "express";

export default function Frete(req: Request, res: Response) {
  const cep: string = req.body.cep;
  const tamanho: number = req.body.altura;
  const peso: string = req.body.peso;


  consultarCep(cep)
    .then((validCEP) => {
      console.log("aqui");
      if (validCEP) {
        let args = {
          sCepOrigem: "81900-981",
          sCepDestino: cep,
          nVlPeso: peso || "0",
          nCdFormato: "1",
          nVlComprimento: String(Number(tamanho) > 15 ? tamanho : 15),
          nVlAltura: String(Number(tamanho) > 15 ? tamanho : 15),
          nVlLargura: String(Number(tamanho) > 15 ? tamanho : 15),
          nCdServico: ["04014", "04510"],
          nVlDiametro: "0",
        };

        calcularPrecoPrazo(args)
          .then((response) => {
            console.log(response);
            res.send(response).status(200);
          })
          .catch((error) => {
            console.log("erro", error);
            res.status(500).send("Erro ao calcular o frete");
          });
      } else {
        res.status(400).send("CEP inválido ou inexistente");
      }
    })
    .catch((error) => {
      console.log("erro", error);
      res.status(500).send("Erro ao verificar o CEP");
    });
}
