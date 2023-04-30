"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.produto = void 0;
const db_1 = require("../database/db");
const produtos_models_1 = require("../models/produtos.models");
function produto(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const {
      nome,
      categoria,
      marca,
      qtd,
      vendidos,
      codigo,
      preco,
      promocao,
      foto,
      descricao,
    } = req.body;
    const validation = produtos_models_1.produtoSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validation.error) {
      res.status(422).send(validation.error.message);
      return;
    }
    try {
      yield db_1.connection.query(
        "INSERT INTO produtos (nome,categoria_id,marca,qtd,vendidos,codigo,preco,promocao,foto,descricao) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10);",
        [
          nome,
          categoria,
          marca,
          qtd,
          vendidos,
          codigo,
          preco,
          promocao,
          foto,
          descricao,
        ]
      );
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
exports.produto = produto;
//# sourceMappingURL=produto.controller.js.map
