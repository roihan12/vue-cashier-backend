import bcrypt from "bcrypt";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  toUserResponse,
} from "../dto/authDto";
import { Pageable } from "../dto/pageDto";
import { UserSearchRequest } from "../dto/userDto";
import { ResponseError } from "../error/responseError";
import User from "../model/userModel";
import { UserValidation } from "../validation/userValidation";
import { Validation } from "../validation/validation";
import { logger } from "../application/logging";
import mongoose from "mongoose";
import { string } from "zod";

export class UserService {
  static async create(request: CreateUserRequest): Promise<UserResponse> {
    const createRequest = Validation.validate(UserValidation.CREATE, request);

    if (createRequest.password !== createRequest.passwordConfirm) {
      throw new ResponseError(400, "Password confirm dose not match");
    }

    const isEmailExist = await this.checkEmail(createRequest.email);

    if (isEmailExist) {
      throw new ResponseError(409, "Email already exists");
    }

    createRequest.password = await bcrypt.hash(createRequest.password, 10);

    const newUser = await User.create({
      fullname: createRequest.fullname,
      email: createRequest.email,
      role: createRequest.role,
      password: createRequest.password,
    });

    if (!newUser) {
      throw new ResponseError(500, "User created failed");
    }

    logger.debug("record : " + JSON.stringify(newUser));
    return toUserResponse(newUser);
  }

  static async update(
    id: string,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.email) {
      const email = await this.checkEmailWithUserId(updateRequest.email!, id);
      if (email) {
        throw new ResponseError(409, "Email already exists");
      }
    }

    if (updateRequest.password) {
      updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const user = await User.findById(id);
    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    user.fullname = updateRequest.fullname || user.fullname;
    user.email = updateRequest.email || user.email;
    user.password = updateRequest.password || user.password;
    user.role = updateRequest.role || user.role;
    user.status = updateRequest.status || user.status;

    const result = await user.save();

    return toUserResponse(result);
  }

  static async findAll(
    request: UserSearchRequest
  ): Promise<Pageable<UserResponse>> {
    const searchRequest = Validation.validate(UserValidation.SEARCH, request);

    type Search = {
      fullname?: object;
      email?: object;
    };
    let query: Search = {};
    if (searchRequest.search) {
      // query.fullname = { $regex: `^${searchRequest.search}`, $options: "i" };
      const regex = `.*${searchRequest.search.split("").join(".*")}.*`;
      query.fullname = { $regex: regex, $options: "i" };
    }

    // if (searchRequest.email) {
    //   query.email = { $regex: `^${searchRequest.email}`, $options: "i" };
    // }

    const users = await User.paginate(query, {
      page: searchRequest.page,
      limit: searchRequest.limit,
    });

    if (!users) {
      throw new ResponseError(500, "Get all users failed");
    }

    return {
      status: true,
      message: "Get all user successfully",
      data: users.docs.map((user) => toUserResponse(user)),
      paging: {
        totalDocs: users.totalDocs,
        hasNextPage: users.hasNextPage,
        hasPrevPage: users.hasPrevPage,
        limit: users.limit,
        nextPage: users.nextPage,
        page: users.page,
        pagingCounter: users.pagingCounter,
        prevPage: users.prevPage,
        totalPages: users.totalPages,
      },
    };
  }

  static async findById(request: string): Promise<UserResponse> {
    const id = Validation.validate(UserValidation.FINDBYID, request);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ResponseError(400, "Invalid id");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const response = toUserResponse(user);
    return response;
  }

  static async remove(request: string): Promise<string> {
    const id = Validation.validate(UserValidation.FINDBYID, request);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ResponseError(400, "Invalid id");
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    return user.id;
  }

  static async checkEmail(email: string): Promise<boolean> {
    const isEmailExist = await User.findOne({ email: email });
    if (!isEmailExist) {
      return false;
    } else {
      return true;
    }
  }
  static async checkEmailWithUserId(
    email: string,
    id: string
  ): Promise<boolean> {
    const ifExist = await User.findOne({ email: email, _id: { $ne: id } });
    if (!ifExist) {
      return false;
    } else {
      return true;
    }
  }
}
