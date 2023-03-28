import { connection } from "@/database/db";
import { Router } from "express";

const router = Router();

router.post("/teste", async (req, res) => {
  const clientes = await connection.query("SELECT * FROM clients;");
  return res.json(clientes.rows);
});

export default router;
