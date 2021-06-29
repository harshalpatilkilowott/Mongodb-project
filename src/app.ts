import dotenv from "dotenv";
dotenv.config({ path: `.env`});
import express from "express";
import apiRouter from "./routes/api";
import bodyParser from "body-parser";
import passport from "passport";
import jwtStrategy from './config/jwt';

passport.use("default", jwtStrategy);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', apiRouter);

export default app;