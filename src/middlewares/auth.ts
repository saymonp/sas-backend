import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/key";
import fs from "fs";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (!(parts.length === 2))
    return res.status(401).send({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token malformatted" });

  const publicKey = fs.readFileSync(authConfig.publicKey, "utf8");
  jwt.verify(
    token,
    publicKey,
    { algorithms: ["RS256"] },
    (err, decoded: any) => {
      if (err) return res.status(401).send({ error: "Token invalid" });

      req.body.userId = decoded.id;
    }
  );

  return next();
};
