import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import test from "./routes/teste";
import signUp from "./routes/signUp";
import signIn from "./routes/signIn";
import checker from "./routes/checker";
import produtos from "./routes/produtos";
import get_produtos from "./routes/get_produtos";
import get_produto from "./routes/get_produtos_id";
import get_categoria from "./routes/get_categoria";
import ranking from "./routes/ranking";
import frete from "./routes/frete";
import cliente from "./routes/cliente";
import pagamento from "./routes/pagamento";
import webhook from "./routes/webhook";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(test);
app.use(signUp);
app.use(signIn);
app.use(checker);
app.use(produtos);
app.use(ranking);
app.use(get_produtos);
app.use(get_produto);
app.use(get_categoria);
app.use(cliente);
app.use(frete);
app.use(pagamento);
app.use(webhook);
app.use(express.static('uploads'));

const port = 55505;

app.listen(port, () => console.log(`Server running in port ${port}`));
