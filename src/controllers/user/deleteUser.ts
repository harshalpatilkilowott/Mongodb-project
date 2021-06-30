import { Request, Response } from "express";
import httpCodes  from "http-status-codes"
import Joi from "joi";
import {User} from "../../entity/User";

export const deleteUser = async (req: Request, res: Response) => {

    try {
            const id = req.params.id;

            const checkIfUserExists = await User.find({_id:id});

            if (checkIfUserExists[0]){

                const deleteUser = await User.deleteOne({_id:id});
                if (deleteUser){
                    return res.status(httpCodes.OK).json({
                        message : "User deleted"
                    });
                }
                else{
                    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
                        ErrorModel : {
                            errorCode: httpCodes.INTERNAL_SERVER_ERROR,
                            errorMessage: "User not deleted"
                            }
                    });
                }
                
            } else {
                return res.status(httpCodes.NOT_FOUND).json({
                    ErrorModel : {
                        errorCode: httpCodes.NOT_FOUND,
                        errorMessage: "User not found"
                        }
                });
            }


    } catch (e) {
        console.log(e);
    }
};
