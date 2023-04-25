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
exports.signUp = void 0;
const signup_models_1 = require("../models/signup.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../database/db");
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password, phone, phonecontact, cpf, payment, email, } = req.body;
        const validation = signup_models_1.signupSchema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            res.status(422).send(validation.error.message);
            return;
        }
        try {
            const { rows } = yield db_1.connection.query("SELECT * FROM clients WHERE email=$1;", [email]);
            if (rows.length > 0) {
                res.status(404).send("Email já cadastrado!");
                return;
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
        const passwordHash = bcrypt_1.default.hashSync(password, 10);
        try {
            yield db_1.connection.query("INSERT INTO clients (name,password,phone,phonecontact,cpf,email) VALUES ($1, $2, $3,$4,$5,$6);", [name, passwordHash, phone, phonecontact, cpf, email]);
            res.sendStatus(201);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.signUp = signUp;
//# sourceMappingURL=signUp.controller.js.map