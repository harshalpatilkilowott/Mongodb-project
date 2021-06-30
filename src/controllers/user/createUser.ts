import { Request, Response } from "express";
import httpCodes  from "http-status-codes"
import bcrypt from "bcryptjs";
import Joi from "joi";
import {User} from "../../entity/User";

export const createUser = async (req: Request, res: Response) => {

    try {

        const {
            email,
            name,
            phone,
            password
        } = req.body;

        //validations
        const createUserSchema = Joi.object().keys({ 
            name: Joi.string().required().messages({
                'string.empty': `Name is required`,
            }),
            email: Joi.string().required().email().messages({
                'string.empty': `Email is required`,
                'string.email': `Enter a valid email`,
            }),
            phone: Joi.number().required().messages({
                'number.empty': `contact is required`,
            }),
            password: Joi.string().required().messages({
                'string.empty': `Password is required`,
            })
        }); 

        const result = createUserSchema.validate(req.body);
        const { value, error } = result;
        const valid = error == null; 
        if (!valid) { 
            const { details } = error; 
            const message = details.map(i => i.message).join(',');
            return res.status(httpCodes.UNPROCESSABLE_ENTITY).json({
                ErrorModel : {
                    errorCode: httpCodes.UNPROCESSABLE_ENTITY,
                    errorMessage: message
                    }
            });
        } 
        else {

            const checkIfEmailAlreadyExists = await User.findOne({ email: email });

            if (!checkIfEmailAlreadyExists){

                let hashPassword = await bcrypt.hash(password,10);
                const user = new User({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassword
                });
                let createUser = await user.save();

                if(createUser) {
                    return res.status(httpCodes.OK).json({
                        message: "User created"
                    });
                } else {
                    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                        ErrorModel : {
                            errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                            errorMessage: "User not created"
                            }
                    });
                }
                

            } else {
                    return res.status(httpCodes.FORBIDDEN).json({
                        ErrorModel : {
                            errorCode: httpCodes.FORBIDDEN,
                            errorMessage: "Email already Exists"
                            }
                    });
            }
        }

    } catch (e) {
        console.log(e);
    }
};
