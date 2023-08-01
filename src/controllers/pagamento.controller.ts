import { Request, Response } from "express";
import mercadopago from "mercadopago";
mercadopago.configure({
  access_token:
    "TEST-829559400567707-072712-870686e10ccc7ed19c68024e9610075a-230791369",
});

export function pagamento(req: Request, res: Response) {
  const preference = req.body.envio;
  console.log(req.body)
  mercadopago.preferences
    .create(preference)
    .then((response) => {
      res.status(200).send(response.body.id);
      return;
    })
    .catch((error) => {
      res.status(400).send(error);
      return;
    });
}
