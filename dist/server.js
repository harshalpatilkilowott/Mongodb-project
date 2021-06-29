"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const redis_1 = require("./config/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
app_1.default.set("port", process.env.PORT || 3000);
redis_1.redis.on('ready', () => {
    console.log("Redis is ready for accepting commands.");
});
mongoose_1.default.connect("mongodb+srv://harshal:harshal@clusterharsh.jowhn.mongodb.net/testdb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((connection) => {
    const server = app_1.default.listen(app_1.default.get("port"), () => {
        console.log(`\n  Connected to database \n`);
        console.log("  App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
        console.log("\n  Press CTRL-C to stop");
        //send ready signal to PM2
        typeof process.send === 'function' ? process.send('ready') : null;
    });
    /**
     * Gracefully shutdown application, Only works in linux system.
     * @link https://pm2.keymetrics.io/docs/usage/signals-clean-restart/
     */
    process.on('SIGINT', () => {
        console.log("Shutdown signal received.");
        server.close(() => {
            process.exit(0);
        });
    });
}).catch(e => console.log(e));
//# sourceMappingURL=server.js.map