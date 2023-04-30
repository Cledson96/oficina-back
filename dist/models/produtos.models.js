"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.produtoSchema = joi_1.default.object({
    nome: joi_1.default.string().required().min(2).max(50),
    categoria: joi_1.default.number().required(),
    marca: joi_1.default.string().required(),
    vendidos: joi_1.default.number(),
    qtd: joi_1.default.number().required(),
    codigo: joi_1.default.string(),
    preco: joi_1.default.string().required(),
    promocao: joi_1.default.string(),
    foto: joi_1.default.string().required(),
    descricao: joi_1.default.string().required(),
});
//# sourceMappingURL=produtos.models.js.map