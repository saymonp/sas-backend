import express from "express";
import routes from "./routes";

import connect from "./connect";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);

const db: string = String(process.env.MONGO_DATABASE);

connect(db);

app.listen(process.env.PORT || 3333);