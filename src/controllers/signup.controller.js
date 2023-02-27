import { signupSchema } from "./../models/signup.models.js";
import bcrypt from "bcrypt";
import { connection } from "../database/db.js";

export async function signUp(req, res) {
  const {
    name,
    address,
    cep,
    password,
    phone,
    phonecontact,
    cpf,
    payment,
    email,
  } = req.body;

  const validation = signupSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.message);
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const { rows } = await connection.query(
      "SELECT * FROM clients WHERE cpf=$1;",
      [cpf]
    );

    if (rows.length > 0) {
      res.status(404).send("CPF já cadastrado!");
      return;
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  try {
    const { rows } = await connection.query(
      "SELECT * FROM clients WHERE email=$1;",
      [email]
    );

    if (rows.length > 0) {
      res.status(404).send("Email já cadastrado!");
      return;
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  try {
    await connection.query(
      "INSERT INTO clients (name,address,cep,password,phone,phonecontact,cpf,payment,email) VALUES ($1, $2, $3,$4,$5,$6, $7,$8,$9);",
      [name, address, cep, password, phone, phonecontact, cpf, payment, email]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
