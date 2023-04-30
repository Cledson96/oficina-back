import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import test from "./routes/teste";
import signUp from "./routes/signUp";
import signIn from "./routes/signIn";
import checker from "./routes/checker";
import produtos from "./routes/produtos";
import get_produtos from "./routes/get_produtos";
import get_categoria from "./routes/get_categoria";
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(test);
app.use(signUp);
app.use(signIn);
app.use(checker);
app.use(produtos);
app.use(get_produtos);
app.use(get_categoria);

const port = 55505;

app.listen(port, () => console.log(`Server running in port ${port}`));
