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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const typeorm_1 = require("typeorm");
const User_1 = require("../../../entity/User");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email);
        /** Validation */
        const loginSchema = joi_1.default.object().keys({
            email: joi_1.default.string().required().email().messages({
                'string.empty': `E-post er obligatorisk`,
                'string.email': `Skriv inn en gyldig e-postadresse`,
            }),
            password: joi_1.default.string().required().messages({
                'string.empty': `Passord er påkrevd`,
            })
        });
        const result = loginSchema.validate(req.body);
        const { value, error } = result;
        const valid = error == null;
        if (!valid) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            return res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY).json({
                code: http_status_codes_1.default.UNPROCESSABLE_ENTITY,
                errorField: 1,
                message: message
            });
        }
        else {
            let fetchUser = yield typeorm_1.getRepository(User_1.User).findOne({
                select: ["id", "email", "password", "firstName", "lastName"],
                where: {
                    email: email,
                    isBlocked: false,
                    isDeleted: false,
                    isAdmin: true
                }
            });
            if (fetchUser) {
                let comparePasswords = yield bcryptjs_1.default.compare(password, fetchUser.password);
                if (comparePasswords) {
                    let jwtToken = jsonwebtoken_1.default.sign({ user_id: fetchUser.id, is_admin: true }, process.env.JWT_SECRET_TOKEN);
                    let userObj = {
                        name: fetchUser.firstName + ' ' + fetchUser.lastName,
                        email: fetchUser.email
                    };
                    return res.status(http_status_codes_1.default.OK).json({
                        accessToken: jwtToken,
                        user: userObj,
                        message: "Success : Admin Logged In"
                    });
                }
            }
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                ErrorModel: {
                    errorCode: http_status_codes_1.default.BAD_REQUEST,
                    errorMessage: "Failed to login"
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map