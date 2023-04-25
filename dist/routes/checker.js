"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checker_controller_1 = require("../controllers/checker.controller");
const router = (0, express_1.Router)();
router.get("/checker", checker_controller_1.checker);
exports.default = router;
//# sourceMappingURL=checker.js.map