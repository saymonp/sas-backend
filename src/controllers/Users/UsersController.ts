import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserSchema from "../../models/User";

import authConfig from "../../config/auth";

class UsersController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserSchema.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "User does not exists" });
      }

      bcrypt.compare(password, user.password, function (err, response) {
        if (response == true) {
          return res.json({
            user: user,
            token: jwt.sign(
              {
                id: user._id,
              },
              authConfig.secret,
              {
                expiresIn: 86400,
              }
            ),
          });
        } else {
          return res.status(400).json({ error: "Incorrect password" });
        }
      });
    } catch (err) {
      return res.status(400).json({ error: "Login failed" });
    }
  }

  async registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      if (await UserSchema.findOne({ email })) {
        return res.status(400).json({ error: "E-mail already registered" });
      }

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const user = await UserSchema.create({
        name,
        email,
        password: hash,
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: "User registration failed" });
    }
  }
}

export default UsersController;
