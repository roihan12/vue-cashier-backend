import { Response, NextFunction, Request } from "express";
import { logger } from "../application/logging";
import { CreateCategoryRequest } from "../dto/categoryDto";
import { CategoryService } from "../service/categoryService";

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
      const response = await CategoryService.create(request);
      logger.debug("response : " + JSON.stringify(response));
      res.status(201).json({
        status: true,
        message: "Category created successfully",
        data: response,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.list();
      res.status(200).json({
        status: true,
        total: response.length,
        message: "Get all category  successfully",
        data: response,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.getById(req.params.id);
      res.status(200).json({
        status: true,
        message: "Get category by id successfully",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
