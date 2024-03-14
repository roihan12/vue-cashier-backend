import { logger } from "../application/logging";
import { CreateUserRequest, UpdateUserRequest } from "../dto/authDto";
import { UserSearchRequest } from "../dto/userDto";
import { UserService } from "../service/userService";
import { Response, NextFunction, Request } from "express";

export class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      logger.debug("request : " + JSON.stringify(request));

      const response = await UserService.create(request,);
      res.status(201).json({
        status: true,
        message: "Created new user successfully",
        data: response,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      logger.debug("request : " + JSON.stringify(request));

      const response = await UserService.update(id, request);
      res.status(200).json({
        status: true,
        message: "Updated user successfully",
        data: response,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserSearchRequest = {
        search: req.query.search as string,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
      };

      const response = await UserService.findAll(request);

      res.status(200).json(response);
    } catch (error: Error | unknown) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await UserService.findById(id);

      res.status(200).json({
        status: true,
        message: "Get user by id successfully",
        data: response,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }

  static async removeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await UserService.remove(id);

      res.status(200).json({
        status: true,
        message: "Delete user successfully",
        data: null,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }
}
