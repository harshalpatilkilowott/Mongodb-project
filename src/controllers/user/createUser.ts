import { Request, Response } from "express";
import httpCodes  from "http-status-codes"
import bcrypt from "bcryptjs";
import Joi from "joi";
import Validator from 'validatorjs';
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
        let rules = {
            name: 'required',
            email: 'required|email',
            phone: 'required|min:10',
            password:'required'
          };
          
        let validation = new Validator(req.body, rules);
        let result1=validation.passes();

        if (result1 == false) { 
            return res.status(httpCodes.UNPROCESSABLE_ENTITY).json({
                ErrorModel : {
                    errorCode: httpCodes.UNPROCESSABLE_ENTITY,
                    errorMessage: "Validation failed , Input data is wrong"
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
