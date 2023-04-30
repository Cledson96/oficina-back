"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/*const { Pool } = pg;
export const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cledson2503_oficina',
  password: 'elizete8',
  port: 5432,
});
*/
const { Pool } = pg_1.default;
exports.connection = new Pool({
    user: 'cledson2503_cledson2503',
    host: 'localhost',
    database: 'cledson2503_oficina',
    password: 'ELIZETE8$',
    port: 5432,
});
//# sourceMappingURL=db.js.map