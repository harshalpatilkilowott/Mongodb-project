import "reflect-metadata";
import {redis} from './config/redis';
import mongoose from "mongoose";
import app from "./app";

app.set("port", process.env.PORT || 3000);

redis.on('ready', () => {
    console.log("Redis is ready for accepting commands.")
});

mongoose.connect("mongodb+srv://harshal:harshal@clusterharsh.jowhn.mongodb.net/testdb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((connection) => {

    const server = app.listen(app.get("port"), () => {

        console.log(
            `\n  Connected to database \n`
        );

        console.log(
            "  App is running at http://localhost:%d in %s mode",
            app.get("port"),
            app.get("env")
        );
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


