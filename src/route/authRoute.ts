import express from "express";
import { AuthController } from "../controller/authController";

export const authRouter = express.Router();

authRouter.post("/api/auth/register", AuthController.register);
authRouter.post("/api/auth/login", AuthController.login);
authRouter.post("/api/auth/refresh-token", AuthController.refreshToken);
