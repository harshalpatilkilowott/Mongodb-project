"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env` });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const jwt_1 = __importDefault(require("./config/jwt"));
passport_1.default.use("default", jwt_1.default);
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/v1', api_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map