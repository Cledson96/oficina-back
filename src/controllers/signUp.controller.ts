import { signupSchema } from "../models/signup.models";
import bcrypt from "bcrypt";
import { connection } from "../database/db";
import { Request, Response } from "express";
import {signUpBody} from "../interfaces/interface"


export async function signUp(req: Request, res: Response) {

  const {
    name,
    password,
    phone,
    phonecontact,
    cpf,
    payment,
    email,
  }:signUpBody = req.body;

  const validation = signupSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.message);
    return;
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
  } catch (error) {
    res.status(500).send(error);
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  
  try {
    await connection.query(
      "INSERT INTO clients (name,password,phone,phonecontact,cpf,email) VALUES ($1, $2, $3,$4,$5,$6);",
      [name, passwordHash, phone, phonecontact, cpf, email]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}
