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
exports.updateUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const User_1 = require("../../entity/User");
const joi_1 = __importDefault(require("joi"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { email, name, phone } = req.body;
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
            let checkIfEmailAlreadyExists = yield User_1.User.findOne({ email: email, '_id': { $ne: id } });
            if (!checkIfEmailAlreadyExists) {
                let user = yield User_1.User.findOne({ _id: id });
                console.log(user);
                if (!user) {
                    return res.status(http_status_codes_1.default.NOT_FOUND).json({
                        ErrorModel: {
                            errorCode: http_status_codes_1.default.NOT_FOUND,
                            errorMessage: "User does not exists"
                        }
                    });
                }
                else {
                    const updateData = {
                        name: name,
                        email: email,
                        phone: phone
                    };
                    let savedUser = yield User_1.User.updateOne({ _id: id }, { $set: updateData });
                    if (savedUser) {
                        return res.status(http_status_codes_1.default.OK).json({
                            message: "User data updated successfully"
                        });
                    }
                    else {
                        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                            ErrorModel: {
                                errorCode: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                                errorMessage: "User data not updated"
                            }
                        });
                    }
                }
            }
            else {
                return res.status(http_status_codes_1.default.FORBIDDEN).json({
                    ErrorModel: {
                        errorCode: http_status_codes_1.default.FORBIDDEN,
                        errorMessage: "Email Already Exists"
                    }
                });
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=updateUser.js.map