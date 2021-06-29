import { Request, Response } from "express";
import httpCodes  from "http-status-codes"
import Joi from "joi";
import {User} from "../../entity/User";

export const userDetails = async (req: Request, res: Response) => {

    try {
            const id = req.params.id;
            console.log(id)
            const checkIfUserExists = await User.find({_id:id});

            if (checkIfUserExists){
                return res.status(httpCodes.OK).json({
                    data: checkIfUserExists,
                    message : "Success"
                });
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
