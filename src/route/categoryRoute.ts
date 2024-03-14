import express from "express";
import { CategoryController } from "../controller/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";
import { UserRole, roleMiddleware } from "../middleware/roleMiddleware";

export const categoryRouter = express.Router();
categoryRouter.use(authMiddleware);
categoryRouter.post(
  "/api/categories",
  roleMiddleware(["admin" as UserRole]),
  CategoryController.create
);
categoryRouter.get(
  "/api/categories",
  roleMiddleware(["admin","employee"]),
  CategoryController.list
);
