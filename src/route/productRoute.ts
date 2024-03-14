import express from "express";
import { ProductController } from "../controller/productController";
import { multerUpload } from "../util/multer";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

export const productRouter = express.Router();

productRouter.use(authMiddleware);
productRouter.use(roleMiddleware(["admin", "cashier"]));
productRouter.post(
  "/api/products",
  multerUpload.array("thumbnails"),
  ProductController.create
);
productRouter.get("/api/products", ProductController.list);
