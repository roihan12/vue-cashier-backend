import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest } from "../dto/authDto";
import { AuthService } from "../service/authService";
import { logger } from "../application/logging";
import { Jwt } from "../util/jwt";
import { UserService } from "../service/userService";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      logger.debug("request : " + JSON.stringify(request));

      const response = await AuthService.register(request);
      res.status(201).json({
        status: true,
        message: "Registration user successfully",
        data: response,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await AuthService.login(request);

      const accessToken = Jwt.generateAccessToken(response);
      const refreshToken = Jwt.generateRefreshToken(response);

      res.status(200).json({
        status: true,
        message: "Login successfully",
        data: response,
        accessToken,
        refreshToken,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken: string = req.body.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          status: false,
          errors: "REFRESH_TOKEN_IS_REQUIRED",
        });
      }

      const verifyToken = Jwt.verifyRefreshToken(refreshToken);
      console.log(verifyToken);
      if (verifyToken === null) {
        return res.status(401).json({
          status: false,
          errors: "INVALID_REFRESH_TOKEN",
        });
      }

      const data = Jwt.parseJWT(refreshToken);

      const user = await UserService.findById(data.id);

      if (!user) {
        return res.status(401).json({
          status: false,
          errors: "REFRESH_TOKEN_FAILED",
        });
      }

      const accessToken = Jwt.generateAccessToken(user);
      const newRefreshToken = Jwt.generateRefreshToken(user);

      return res.status(200).json({
        status: true,
        message: "Refresh token successfully",
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }
}
