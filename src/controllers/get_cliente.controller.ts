import { connection } from "../database/db";
import { Request, Response } from "express";

export async function clienteId(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const { rows } = await connection.query(
      "SELECT name, address, phone, phonecontact, cpf, cep, email FROM clients WHERE id = $1;",
      [id]
    );

    if (rows.length === 0) {
      res.status(404).send("Usuario não encontrado!");
      return;
    }

    res.status(200).send(rows[0]);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
}
