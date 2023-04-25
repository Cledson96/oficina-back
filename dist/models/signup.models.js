"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(6).max(50),
    password: joi_1.default.string().required().min(6).max(50),
    phone: joi_1.default.number().required(),
    phonecontact: joi_1.default.number(),
    cpf: joi_1.default.string().length(11).pattern(/^[0-9]+$/),
    payment: joi_1.default.string(),
    email: joi_1.default.string().email().required(),
});
//# sourceMappingURL=signup.models.js.map