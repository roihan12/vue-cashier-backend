import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../type/userRequest";
export type UserRole = "admin" | "cashier" | "employee";

export const roleMiddleware =
  (allowedRoles: UserRole[]) =>
  (req: UserRequest, res: Response, next: NextFunction): Response | void => {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(401).json({
        status: false,
        error: "Unauthorized",
        message: "Invalid user or role not found",
      });
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      return res.status(403).json({
        status: false,
        error: "Forbidden",
        message: "You do not have permission to access this resource",
      });
    }

    next();
  };
