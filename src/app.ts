import express from "express";
import cors from "cors";

import routes from "./routes";

import dotenv from "dotenv";
dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
    this.app.use(express.json());
    this.app.use(routes);
  }
}

export default new App().app;
