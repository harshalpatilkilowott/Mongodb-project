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
exports.createUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const User_1 = require("../../entity/User");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, phone, password } = req.body;
        //validations
        const createUserSchema = joi_1.default.object().keys({
            name: joi_1.default.string().required().messages({
                'string.empty': `Name is required`,
            }),
            email: joi_1.default.string().required().email().messages({
                'string.empty': `Email is required`,
                'string.email': `Enter a valid email`,
            }),
            phone: joi_1.default.number().required().messages({
                'number.empty': `contact is required`,
            }),
            password: joi_1.default.string().required().messages({
                'string.empty': `Password is required`,
            })
        });
        const result = createUserSchema.validate(req.body);
        const { value, error } = result;
        const valid = error == null;
        if (!valid) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            return res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY).json({
                ErrorModel: {
                    errorCode: http_status_codes_1.default.UNPROCESSABLE_ENTITY,
                    errorMessage: message
                }
            });
        }
        else {
            const checkIfEmailAlreadyExists = yield User_1.User.findOne({ email: email });
            if (!checkIfEmailAlreadyExists) {
                let hashPassword = yield bcryptjs_1.default.hash(password, 10);
                const user = new User_1.User({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassword
                });
                let createUser = yield user.save();
                if (createUser) {
                    return res.status(http_status_codes_1.default.OK).json({
                        message: "User created"
                    });
                }
                else {
                    return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                        ErrorModel: {
                            errorCode: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                            errorMessage: "User not created"
                        }
                    });
                }
            }
            else {
                return res.status(http_status_codes_1.default.FORBIDDEN).json({
                    ErrorModel: {
                        errorCode: http_status_codes_1.default.FORBIDDEN,
                        errorMessage: "Email already Exists"
                    }
                });
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map