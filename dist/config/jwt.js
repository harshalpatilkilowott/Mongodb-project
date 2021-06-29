"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const redis_1 = require("./redis");
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_TOKEN,
    passReqToCallback: true
};
exports.default = new passport_jwt_1.Strategy(jwtOptions, (request, jwt_payload, done) => {
    const result = redis_1.redis.lrange('user_blocked', 0, -1).then((blockList) => {
        let userIdToBeChecked = jwt_payload.user_id.toString();
        if (blockList.includes(userIdToBeChecked)) {
            request.body.message = 'This account has been blocked or deleted.';
            return done(true);
        }
        else {
            request.body.authUserId = jwt_payload.user_id;
            request.body.isAdmin = jwt_payload.is_admin;
            return done(null, true);
        }
    });
});
//# sourceMappingURL=jwt.js.map