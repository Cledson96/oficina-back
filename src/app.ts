import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import test from "./routes/teste";
import signUp from "./routes/signUp";
import signIn from "./routes/signIn";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(test);
app.use(signUp);
app.use(signIn);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running in port ${port}`));