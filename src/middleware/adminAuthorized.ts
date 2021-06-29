import {Request, Response, NextFunction} from "express"
import passport from "passport";
import httpStatus from "http-status-codes"

export default (req: Request, res: Response, next: NextFunction) => {
    
    passport.authenticate('default', { session: false }, async (error, token) => {
        
        if (error || !token || !req.body.isAdmin){
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "The session has expired!"
            });
        }

        next();
    })(req, res, next);
};
