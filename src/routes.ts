import express, { Request, Response } from "express";

import usersRoutes from "./controllers/Users/usersRoutes";

import { authMiddleware } from "./middlewares/auth";
import { ioConnection } from "./middlewares/ioConnection";

const routes = express.Router();

routes.use(usersRoutes);

routes.get(
  "/api/v1/restricted",
  authMiddleware,
  (req: Request, res: Response) => {
    res.send({
      msg: "Your Access Token was successfully validated!",
      userId: req.body.userId,
    });
  }
);

routes.get("/api/v1/joinRoom", authMiddleware, ioConnection);

export default routes;
