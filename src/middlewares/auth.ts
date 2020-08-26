import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

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

  try {
    const decodedToken: any = jwt.decode(token, { complete: true });

    req.body.userId = decodedToken.payload.id;

    return next();
  } catch (err) {
    return res.status(401).send({ error: "Token invalid" });
  }
};
