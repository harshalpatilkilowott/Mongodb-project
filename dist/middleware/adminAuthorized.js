"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.default = (req, res, next) => {
    passport_1.default.authenticate('default', { session: false }, (error, token) => __awaiter(void 0, void 0, void 0, function* () {
        if (error || !token || !req.body.isAdmin) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                message: "The session has expired!"
            });
        }
        next();
    }))(req, res, next);
};
//# sourceMappingURL=adminAuthorized.js.map