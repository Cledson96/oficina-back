import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import test from "./src/routes/teste.js";
import signup from "./src/routes/signup.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(test);
app.use(signup);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running in port ${port}`));
