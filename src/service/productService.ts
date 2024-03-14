import { logger } from "../application/logging";
import {
  CreateProductRequest,
  ProductResponse,
  toProductResponse,
} from "../dto/productDto";
import { ResponseError } from "../error/responseError";
import Product from "../model/productModel";
import { ProductValidation } from "../validation/productValidation";
import { Validation } from "../validation/validation";
import { CategoryService } from "./categoryService";
import { CloudinaryService } from "./cloudinaryService";

export class ProductService {
  static async create(request: CreateProductRequest): Promise<ProductResponse> {
    const createRequest = Validation.validate(
      ProductValidation.CREATE,
      request
    );
    const categoryExist = await CategoryService.getById(
      createRequest.categoryId
    );

    if (!categoryExist) {
      throw new ResponseError(404, "Category not found");
    }

    const productExits = await Product.findOne({ title: createRequest.title });

    if (productExits) {
      throw new ResponseError(428, "Product is already exists");
    }

    let imageUpload: string[] = [];
    await Promise.all(
      createRequest.thumbnails.map(async (file) => {
        const { imageURL } = await CloudinaryService.uploadImage(file);
        console.log(imageURL);
        imageUpload.push(imageURL!);
      })
    );

    const newProduct = await Product.create({
      title: createRequest.title,
      thumbnails: imageUpload,
      price: createRequest.price,
      categoryId: createRequest.categoryId,
    });

    if (!newProduct) {
      throw new ResponseError(500, "Store new product failed");
    }

    logger.debug("record : " + JSON.stringify(newProduct));
    return toProductResponse(newProduct);
  }

  static async list(): Promise<Array<ProductResponse>> {
    const products = await Product.find({
      status: "active",
    });
    if (!products) {
      throw new ResponseError(500, "Get all products failed");
    }
    return products.map((product) => toProductResponse(product));
  }
}
