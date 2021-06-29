import { Request, Response } from "express";
import httpCodes  from "http-status-codes";
import { User } from "../../entity/User";
import Joi from "joi";

export const updateUser = async (req: Request, res: Response) => {

    try {   
        const id = req.params.id;

        const {
            email,
            name,
            phone
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
        else{

            let checkIfEmailAlreadyExists = await User.findOne({ email: email, '_id': { $ne: id } })
            
            if (!checkIfEmailAlreadyExists){

                let user = await User.findOne({_id:id});

                console.log(user)
                if(!user){
                    return res.status(httpCodes.NOT_FOUND).json({
                        ErrorModel : {
                            errorCode: httpCodes.NOT_FOUND,
                            errorMessage: "User does not exists"
                            }
                    });
                }
                else{
                    const updateData = {
                        name: name,
                        email: email,
                        phone: phone
                    };
                    let savedUser =  await User.updateOne({_id:id}, { $set: updateData })
                    
                    if(savedUser) {
                        return res.status(httpCodes.OK).json({
                            message : "User data updated successfully"
                        });
                    } else {
                        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                            ErrorModel : {
                                errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                                errorMessage: "User data not updated"
                                }
                        });
                    }
                }
            }
            else{
                    return res.status(httpCodes.FORBIDDEN).json({
                        ErrorModel : {
                            errorCode: httpCodes.FORBIDDEN,
                            errorMessage: "Email Already Exists"
                            }
                    });             
            }
        }

    } catch (e) {
        console.log(e);
    }


};
