import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { signupSchema } from "../models/signup.models";

const prisma = new PrismaClient();

export async function signUp(req: Request, res: Response) {
  const { name, password, phone, phonecontact, cpf, payment, email } = req.body;

  const validation = signupSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.message);
    return;
  }

  try {
    const client = await prisma.clients.findFirst({
      where: {
        email: email,
      },
    });

    if (client) {
      res.status(404).send("Email já cadastrado!");
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await prisma.clients.create({
      data: {
        name: name,
        password: passwordHash,
        phone: phone,
        phonecontact: phonecontact,
        cpf: cpf,
        email: email,
      },
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}
