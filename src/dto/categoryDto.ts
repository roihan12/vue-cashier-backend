import { ICategory } from "../model/categoryModel";

export type CategoryResponse = {
  id: string;
  title: string;
  status: string;
  createdAt?: number;
  updatedAt?: number;
};

export type CreateCategoryRequest = {
  title: string;
};

export type UpdateCategoryRequest = {
  title?: string;
  status?: string;
};



export function toCategoryResponse(category: ICategory): CategoryResponse {
  return {
    id: category.id,
    title: category.title,
    status: category.status,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}
