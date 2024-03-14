import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/responseError";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const errorMessage = error.errors[0].message;
    res.status(400).json({
      status: false,
      errors: errorMessage,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      status: false,
      errors: error.message,
    });
  } else {
    res.status(500).json({
      status: false,
      errors: error.message,
    });
  }
};
