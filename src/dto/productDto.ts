import { ObjectId } from "mongoose";
import { IProduct } from "../model/productModel";

export type ProductResponse = {
  id: string;
  title: string;
  thumbnails: string[];
  price: number;
  categoryId: string;
  status: string;
  createdAt?: number;
  updatedAt?: number;
};

export type CreateProductRequest = {
  title: string;
  thumbnails: string[];
  price: number;
  categoryId: string;
};

export type UpdateProductRequest = {
  title?: string;
  thumbnails?: string[];
  price?: number;
  categoryId?: string;
};

export function toProductResponse(Product: IProduct): ProductResponse {
  return {
    id: Product.id,
    title: Product.title,
    thumbnails: Product.thumbnails,
    price: Product.price,
    categoryId: (Product.categoryId as unknown as ObjectId).toString(),
    status: Product.status,
    createdAt: Product.createdAt,
    updatedAt: Product.updatedAt,
  };
}
