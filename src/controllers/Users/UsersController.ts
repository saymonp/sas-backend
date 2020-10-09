import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";

import UserSchema from "../../models/User";

import keysConfig from "../../config/key";

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
          const privateKey = fs.readFileSync(keysConfig.privateKey, "utf8");
          const publicKey = fs.readFileSync(keysConfig.publicKey, "utf8");

          return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            publicKey: publicKey,
            token: jwt.sign(
              {
                id: user._id,
              },
              privateKey,
              {
                expiresIn: 300, // 5min
                algorithm: "RS256", //SHA-256
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

      return res.status(201).json({ id: user._id });
    } catch (err) {
      return res.status(400).json({ error: "User registration failed" });
    }
  }
}

export default UsersController;
