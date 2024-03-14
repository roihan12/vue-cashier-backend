import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title Must be 1 or more characters long" })
      .max(100, { message: "Title Max 100 characters " }),
  });



  static readonly GET: z.ZodType<string> = z.string({
    required_error: "Category Id is required",
  });
}
