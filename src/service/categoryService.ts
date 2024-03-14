import { CategoryValidation } from "./../validation/categoryValidation";
import { Validation } from "../validation/validation";
import { logger } from "../application/logging";
import { ResponseError } from "../error/responseError";
import {
  CategoryResponse,
  CreateCategoryRequest,
  toCategoryResponse,
} from "../dto/categoryDto";
import Category from "../model/categoryModel";
import mongoose from "mongoose";

export class CategoryService {
  static async create(
    request: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    const createRequest = Validation.validate(
      CategoryValidation.CREATE,
      request
    );

    const newCategory = await Category.create({
      title: createRequest.title,
    });

    if (!newCategory) {
      throw new ResponseError(500, "Store category failed");
    }

    logger.debug("record : " + JSON.stringify(newCategory));
    return toCategoryResponse(newCategory);
  }

  static async list(): Promise<Array<CategoryResponse>> {
    const categories = await Category.find({
      status: "active",
    });
    if (!categories) {
      throw new ResponseError(500, "Get all categories failed");
    }
    return categories.map((category) => toCategoryResponse(category));
  }

  static async getById(request: string): Promise<CategoryResponse> {
    const categoryId = Validation.validate(CategoryValidation.GET, request);

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new ResponseError(400, "Invalid category id");
    }
    const category = await Category.findById({
      _id: categoryId,
    });

    if (!category) {
      throw new ResponseError(404, "Category not found");
    }

    return toCategoryResponse(category);
  }
}
