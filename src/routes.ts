import express, { Request, Response } from "express";

import usersRoutes from "./controllers/Users/usersRoutes";
import messagesRoutes from "./controllers/Messages/messagesRoutes";

import { authMiddleware } from "./middlewares/auth";

const routes = express.Router();

routes.use(usersRoutes);
routes.use(messagesRoutes);

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

export default routes;
