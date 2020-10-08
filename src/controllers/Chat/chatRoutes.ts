import express from "express";

import { authMiddleware } from "../../middlewares/auth";
import { ioConnection } from "../../middlewares/ioConnection";

const chatRoutes = express.Router();

chatRoutes.post("/api/v1/joinRoom", authMiddleware, ioConnection);

export default usersRoutes;
