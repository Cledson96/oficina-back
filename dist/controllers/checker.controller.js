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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checker = void 0;
const db_1 = require("@/database/db");
function checker(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.headers;
        if (!token) {
            res.status(404).send("Obrigatório envio de um token valido!");
            return;
        }
        try {
            const { rows } = yield db_1.connection.query('SELECT * FROM sessions WHERE token =$1;', [token]);
            if (rows.length > 0) {
                res.status(200).send(rows[0].name);
                return;
            }
            res.status(404).send("token invalido");
            return;
        }
        catch (error) {
            res.status(500).send(error);
            return;
        }
    });
}
exports.checker = checker;
//# sourceMappingURL=checker.controller.js.map