"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const teste_1 = __importDefault(require("./routes/teste"));
const signUp_1 = __importDefault(require("./routes/signUp"));
const signIn_1 = __importDefault(require("./routes/signIn"));
const checker_1 = __importDefault(require("./routes/checker"));
const produtos_1 = __importDefault(require("./routes/produtos"));
const get_produtos_1 = __importDefault(require("./routes/get_produtos"));
const get_categoria_1 = __importDefault(require("./routes/get_categoria"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(teste_1.default);
app.use(signUp_1.default);
app.use(signIn_1.default);
app.use(checker_1.default);
app.use(produtos_1.default);
app.use(get_produtos_1.default);
app.use(get_categoria_1.default);
const port = 55505;
app.listen(port, () => console.log(`Server running in port ${port}`));
//# sourceMappingURL=app.js.map