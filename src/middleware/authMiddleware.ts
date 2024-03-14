import { NextFunction, Response } from "express";
import { UserRequest } from "../type/userRequest";
import { Jwt } from "../util/jwt";

export const authMiddleware = (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (token === undefined) {
    return res.status(401).json({
      status: false,
      error: "Unauthorized",
      message: "Please login first",
    });
  }

  const verifyUser = Jwt.verifyAccessToken(String(token));

  if (!verifyUser) {
    return res.status(401).json({
      status: false,
      error: "Unauthorized",
      message: "Invalid token",
    });
  }

  const user = Jwt.parseJWT(String(token));
  req.user = user;
  next();
};
