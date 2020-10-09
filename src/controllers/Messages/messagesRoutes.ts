import express from "express";

import MessagesController from "./MessagesController";
import { authMiddleware } from "../../middlewares/auth";

const messagesRoutes = express.Router();

const messagesController = new MessagesController();

messagesRoutes.post(
  "/api/v1/createMessage",
  authMiddleware,
  messagesController.create
);
messagesRoutes.get(
  "/api/v1/showMessage/:id",
  authMiddleware,
  messagesController.show
);

export default messagesRoutes;
