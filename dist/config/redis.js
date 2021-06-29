"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const Redis = require("ioredis");
exports.redis = new Redis({
    port: 6379,
    host: "127.0.0.1",
    ableReadyCheck: true
});
//# sourceMappingURL=redis.js.map