"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_categorias_controller_1 = require("../controllers/get_categorias.controller");
const router = (0, express_1.Router)();
router.get("/categoria", get_categorias_controller_1.categoria);
exports.default = router;
//# sourceMappingURL=get_categoria.js.map