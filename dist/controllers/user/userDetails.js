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
exports.userDetails = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const User_1 = require("../../entity/User");
const userDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const checkIfUserExists = yield User_1.User.find({ _id: id });
        if (checkIfUserExists) {
            return res.status(http_status_codes_1.default.OK).json({
                data: checkIfUserExists,
                message: "Success"
            });
        }
        else {
            return res.status(http_status_codes_1.default.NOT_FOUND).json({
                ErrorModel: {
                    errorCode: http_status_codes_1.default.NOT_FOUND,
                    errorMessage: "User not found"
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.userDetails = userDetails;
//# sourceMappingURL=userDetails.js.map