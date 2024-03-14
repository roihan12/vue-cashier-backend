import { logger } from "../application/logging";
import {
  CreateUserRequest,
  LoginUserRequest,
  UserResponse,
  toUserResponse,
} from "../dto/authDto";
import { ResponseError } from "../error/responseError";
import User from "../model/userModel";
import { UserValidation } from "../validation/userValidation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class AuthService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.CREATE, request);

    if (registerRequest.password !== registerRequest.passwordConfirm) {
      throw new ResponseError(400, "Password confirm dose not match");
    }

    const isEmailExist = await User.findOne({ email: registerRequest.email });

    if (isEmailExist) {
      throw new ResponseError(409, "Email already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const newUser = await User.create({
      fullname: registerRequest.fullname,
      email: registerRequest.email,
      password: registerRequest.password,
    });

    if (!newUser) {
      throw new ResponseError(500, "User register failed");
    }

    logger.debug("record : " + JSON.stringify(newUser));
    return toUserResponse(newUser);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await User.findOne({
      email: loginRequest.email,
      status: "active",
    });
    if (!user) {
      throw new ResponseError(403, "EMAIL_OR_PASSWORD_WRONG");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(403, "EMAIL_OR_PASSWORD_WRONG");
    }

    const response = toUserResponse(user);
    return response;
  }
}
