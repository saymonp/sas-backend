import express from "express";

import UsersController from "./UsersController";

const usersRoutes = express.Router();

const usersController = new UsersController();

usersRoutes.post("/api/v1/login", usersController.login);
usersRoutes.post("/api/v1/register", usersController.registerUser);

export default usersRoutes;
