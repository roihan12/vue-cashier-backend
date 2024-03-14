import { unlinkSync } from "fs";
import { Response, NextFunction, Request } from "express";
import { logger } from "../application/logging";
import { CreateProductRequest } from "../dto/productDto";
import { ProductService } from "../service/productService";

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const files = req.files as [Express.Multer.File];
    logger.debug("req file : " + JSON.stringify(files));
    let imageLinks: string[] = [];

    await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        logger.debug("Path : " + file.path);
        imageLinks.push(file.path);
      })
    );

    try {
      const request: CreateProductRequest = req.body as CreateProductRequest;
      request.thumbnails = imageLinks;

      if (request.price) {
        request.price = Number(request.price);
      }

      const response = await ProductService.create(request);
      logger.debug("response : " + JSON.stringify(response));
      res.status(201).json({
        status: true,
        message: "Product created successfully",
        data: response,
      });
    } catch (error: Error | unknown) {
      imageLinks.map((imageLink) => {
        unlinkSync(imageLink);
      });
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ProductService.list();
      res.status(200).json({
        status: true,
        total: response.length,
        message: "Get all products  successfully",
        data: response,
      });
    } catch (error: Error | unknown) {
      next(error);
    }
  }
}
