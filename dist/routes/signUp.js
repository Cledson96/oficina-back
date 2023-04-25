"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUp_controller_1 = require("../controllers/signUp.controller");
const router = (0, express_1.Router)();
router.post("/sign_up", signUp_controller_1.signUp);
exports.default = router;
//# sourceMappingURL=signUp.js.map