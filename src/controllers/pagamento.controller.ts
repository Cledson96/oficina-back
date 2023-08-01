import { Request, Response } from "express";
import mercadopago from "mercadopago";
mercadopago.configure({
  access_token:
    "TEST-829559400567707-072712-870686e10ccc7ed19c68024e9610075a-230791369",
});

export function pagamento(req: Request, res: Response) {
  const preference = req.body.envio;
  console.log(req.body)
  console.log(preference);
  mercadopago.preferences
    .create({
      items: [
        {
          id: "item-ID-1234",
          title: "Meu produto",
          currency_id: "BRL",
          picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
          description: "Descrição do Item",
          category_id: "art",
          quantity: 1,
          unit_price: 75.76
        },
      ],
      payer: {
        name: "João",
        surname: "Silva",
        email: "user@email.com",
        phone: {
          area_code: "11",
          number: "4444-4444"
        },

        address: {
          street_name: "Street",
          street_number: 123,
          zip_code: "06233200"
        }
      },
      back_urls: {
        success: "http://localhost:3000/concluido",
        failure: "http://localhost:3000/concluido",
      },
      auto_return: "approved",
    })
    .then((response) => {
      res.status(200).send(response.body.id);
      return;
    })
    .catch((error) => {
      res.status(400).send(error);
      return;
    });
}
