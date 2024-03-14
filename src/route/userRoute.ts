import express from "express";
import { UserController } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";
export const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get("/api/users", UserController.getAllUsers);
userRouter.post("/api/users", UserController.createUser);
userRouter.patch("/api/users/:id", UserController.updateUser);
userRouter.get("/api/users/:id", UserController.getUserById);
userRouter.delete("/api/users/:id", UserController.removeUser);
