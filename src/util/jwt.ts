import "dotenv/config";
import jsonWebToken, { JwtPayload } from "jsonwebtoken";
import { SignPayload, UserResponse } from "../dto/authDto";
import config from "../../config/default";

export class Jwt {
  static generateAccessToken(user: UserResponse): string {
    const jwtPayload: SignPayload = {
      id: user.id,
      role: user.role,
      status: user.status,
    };
    return jsonWebToken.sign(jwtPayload, String(config.accessTokenPrivateKey), {
      expiresIn:
        config.accessTokenExpireIn != null
          ? String(config.accessTokenExpireIn)
          : "1800s",
    });
  }

  static generateRefreshToken(user: UserResponse): string {
    const jwtPayload: SignPayload = {
      id: user.id,
      role: user.role,
      status: user.status,
    };
    return jsonWebToken.sign(
      jwtPayload,
      String(config.refreshTokenPrivateKey),
      {
        expiresIn:
          config.refreshTokenExpireIn != null
            ? String(config.refreshTokenExpireIn)
            : "1d",
      }
    );
  }

  static verifyRefreshToken(token: string): string | null | JwtPayload {
    try {
      return jsonWebToken.verify(token, String(config.refreshTokenPrivateKey));
    } catch (error: Error | unknown) {
      // console.log(error);
      return null;
    }
  }

  static parseJWT(token: string): UserResponse {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }

  static verifyAccessToken(token: string): string | false | JwtPayload {
    try {
      return jsonWebToken.verify(token, String(config.accessTokenPrivateKey));
    } catch (error) {
      return false;
    }
  }
}
