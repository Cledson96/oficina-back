"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const signin_models_1 = require("../models/signin.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../database/db");
const uuid_1 = require("uuid");
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = signin_models_1.signInSchema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            res.status(422).send("Digite corretamente seu login!");
            return;
        }
        const { email, password } = req.body;
        const token = (0, uuid_1.v4)();
        try {
            const { rows } = yield db_1.connection.query("SELECT * FROM clients WHERE email=$1;", [email]);
            if (rows.length === 0) {
                res.status(404).send("Usuario não cadastrado!");
                return;
            }
            const verifypassword = bcrypt_1.default.compareSync(password, rows[0].password);
            if (!verifypassword) {
                return res.status(401).send("Email ou senha incorreto!");
            }
            const sessions = yield db_1.connection.query('SELECT * FROM sessions WHERE "clientId"=$1;', [rows[0].id]);
            if (sessions.rows.length != 0) {
                res.locals.users = sessions;
                return res.send({ token: sessions.rows[0].token, name: sessions.rows[0].name });
            }
            yield db_1.connection.query('INSERT INTO sessions ("clientId",name,token) VALUES ($1, $2, $3);', [rows[0].id, rows[0].name, token]);
            res.send({ token, name: rows[0].name });
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.signIn = signIn;
//# sourceMappingURL=signIn.controller.js.map