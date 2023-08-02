import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { signInSchema } from "../models/signin.models";

const prisma = new PrismaClient();

export async function signIn(req: Request, res: Response) {
  const validation = signInSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    res.status(422).send("Digite corretamente seu login!");
    return;
  }

  const { email, password } = req.body;

  const token = v4();

  try {
    const client = await prisma.clients.findFirst({
      where: {
        email: email,
      },
    });

    if (!client) {
      res.status(404).send("Usuario não cadastrado!");
      return;
    }

    const verifypassword = bcrypt.compareSync(password, client.password);

    if (!verifypassword) {
      return res.status(401).send("Email ou senha incorreto!");
    }

    const session = await prisma.sessions.findFirst({
      where: {
        clientId: client.id,
      },
    });

    if (session) {
      res.locals.users = session;
      return res.send({ token: session.token, name: session.name });
    }

    await prisma.sessions.create({
      data: {
        clientId: client.id,
        name: client.name,
        token: token,
      },
    });

    res.send({ token, name: client.name });
  } catch (error) {
    res.status(500).send(error);
  }
}
