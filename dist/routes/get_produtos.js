"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_produtos_controller_1 = require("../controllers/get_produtos.controller");
const router = (0, express_1.Router)();
router.get("/produtos", get_produtos_controller_1.produto);
exports.default = router;
//# sourceMappingURL=get_produtos.js.map