import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { Request } from "express"
import {redis} from "./redis";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_TOKEN,
    passReqToCallback: true
};

type PayloadProps = {
    user_id: string;
    is_admin: Boolean
}

export default new Strategy(jwtOptions, (request: Request, jwt_payload: PayloadProps, done: VerifiedCallback) => {

    const result = redis.lrange('user_blocked',0,-1).then((blockList: any) => {

        let userIdToBeChecked = jwt_payload.user_id.toString();
        
        if (blockList.includes(userIdToBeChecked)){
            request.body.message = 'This account has been blocked or deleted.';
            return done(true);
        }else {
            request.body.authUserId = jwt_payload.user_id;
            request.body.isAdmin= jwt_payload.is_admin;
            return done(null, true);
        }

    })
});
