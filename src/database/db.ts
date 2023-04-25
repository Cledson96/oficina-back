import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
export const connection = new Pool({
  user: 'cledson2503_cledson2503',
  host: 'localhost',
  database: 'cledson2503_oficina',
  password: 'ELIZETE8$',
  port: 5432,
});
