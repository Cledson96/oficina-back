"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produto_controller_1 = require("../controllers/produto.controller");
const router = (0, express_1.Router)();
router.post("/produtos", produto_controller_1.produto);
exports.default = router;
//# sourceMappingURL=produtos.js.map